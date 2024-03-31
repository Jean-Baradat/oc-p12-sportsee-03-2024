import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Layout from "@/layouts/Layout"
import Home from "@pages/Home"
import NotFound from "@/pages/NotFound"

const Router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
		],
	},
])

export default Router
