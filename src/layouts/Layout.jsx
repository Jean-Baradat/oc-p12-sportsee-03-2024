import React from "react"
import Aside from "@layouts/aside/Aside"
import Header from "@layouts/header/Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
	return (
		<div className="grid h-screen grid-cols-auto-1fr grid-rows-auto-1fr overflow-auto font-medium">
			<Header />
			<Aside />
			<Outlet />
		</div>
	)
}

export default Layout
