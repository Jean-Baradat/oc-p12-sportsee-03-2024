import React from "react"
import Aside from "@layouts/aside/Aside"
import Header from "@layouts/header/Header"

const Layout = () => {
	return (
		<main className="grid h-screen grid-cols-auto-1fr grid-rows-auto-1fr overflow-auto">
			<Header />
			<Aside />
			<main>test</main>
		</main>
	)
}

export default Layout
