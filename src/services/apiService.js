import axios from "axios"
import { routes } from "@/services/apiRoutes"

/**
 * Fetches user data based on the provided id. In a development environment,
 * it imports a user data file and searches for the user with the provided id.
 * In a production environment, it makes API calls to fetch user data.
 *
 * @param {number} id - The id of the user.
 *
 * @returns {Promise<object> | object} A promise that resolves with an object
 * of user data in a development environment, or an object of user data in a
 * production environment.
 *
 * @throws {Error} Will throw an error if the user is unknown or if there is
 * an error in fetching the data.
 */
export const getUserData = async id => {
	if (import.meta.env.DEV) {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				try {
					let usersData = await import(import.meta.env.VITE_API_URL)
					usersData = usersData.default

					let currentUserData = {}
					for (const property in usersData) {
						const foundUserData = usersData[property].find(
							userData => (userData.id || userData.userId) === id,
						)

						if (foundUserData) {
							currentUserData[property] = foundUserData
						}
					}

					if (JSON.stringify(currentUserData) !== "{}") {
						currentUserData["MODE"] = import.meta.env.MODE
						resolve(currentUserData)
					} else {
						reject(new Error("This user is unknown"))
					}
				} catch (error) {
					reject(error)
				}
			}, 1000)
		})
	} else {
		const instance = axios.create({
			baseURL: import.meta.env.VITE_API_URL + id,
		})

		let currentUserData = {}
		for (const property in routes) {
			const foundUserData = await instance
				.get(routes[property])
				.then(result => {
					return result.data.data
				})
				.catch(() => {
					return null
				})

			if (foundUserData) {
				currentUserData[property] = foundUserData
			}
		}

		if (JSON.stringify(currentUserData) !== "{}") {
			currentUserData["MODE"] = import.meta.env.MODE
			return currentUserData
		} else {
			return new Error("This user is unknown")
		}
	}
}
