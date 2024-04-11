import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * This component is the login page used to simplify testing.
 *
 * The input field is inspired by tailwindcomponents.com with some modifications (see source)
 *
 * @returns {function} React component
 *
 * @see https://tailwindcomponents.com/components/tailwind-css-input-by-material-tailwind (input)
 */
const Login = () => {
	const [id, setId] = useState("")
	const loginForm = useRef(null)
	const navigate = useNavigate()

	const handleFormSubmit = e => {
		e.preventDefault()

		const newId = loginForm.current.elements.id.value
		if (newId) {
			setId(newId)
		}
	}

	useEffect(() => {
		navigate(`/${id}/home`)
	}, [id, navigate])

	return (
		<main className="flex h-screen items-center justify-center">
			<form
				onSubmit={handleFormSubmit}
				ref={loginForm}
				className="flex flex-col items-center justify-center gap-6 rounded-xl p-10 shadow-lg"
			>
				<h1 className="mb-5 text-5xl font-medium">Connexion</h1>
				<div className="relative h-10 w-full">
					<input
						className="border-blue-gray-200 text-blue-gray-700 disabled:bg-blue-gray-50 peer h-full w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal placeholder-gray-500 placeholder-opacity-0 outline outline-0 transition-all focus:border-primary focus:border-t-transparent focus:placeholder-opacity-40 focus:outline-0 disabled:border-0"
						placeholder="12 ou 18"
						id="id"
						type="number"
					/>
					<label
						htmlFor="id"
						className="before:content[' '] after:content[' '] text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-primary peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent"
					>
						ID de l'utilisateur
					</label>
				</div>
				<button
					type="submit"
					className="w-full items-center rounded-md bg-black px-6 py-3 text-white transition duration-300 hover:bg-primary hover:text-white"
				>
					Se connecter
				</button>
			</form>
		</main>
	)
}

export default Login
