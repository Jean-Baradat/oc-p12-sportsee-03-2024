import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Layout from "@/layouts/Layout"
import Home from "@pages/home/Home"
import NotFound from "@/pages/NotFound"
import ErrorBoundary from "@/pages/ErrorBoundary"
import Login from "@pages/Login"

/**
 * Router is an array of the application's hard routes
 */
const Router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/:id/home",
		element: <Layout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: "/:id/home",
				element: <Home />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
])

export default Router
