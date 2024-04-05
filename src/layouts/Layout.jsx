import React, { useEffect, useState } from "react"
import Aside from "@layouts/aside/Aside"
import Header from "@layouts/header/Header"
import { Outlet, useParams } from "react-router-dom"
import { getUserData } from "@/services/apiService"

const Layout = () => {
	const [user, setUser] = useState(null)
	let { id } = useParams()

	useEffect(() => {
		;(async () => {
			try {
				const result = await getUserData(parseInt(id))
				setUser(result)
			} catch (error) {
				setUser(error)
			}
		})()
	}, [id])

	return (
		<div className="grid h-screen grid-cols-auto-1fr grid-rows-auto-1fr overflow-auto font-medium">
			<Header />
			<Aside />
			<Outlet context={[user]} />
		</div>
	)
}

export default Layout
