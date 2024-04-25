import React from "react"
import { RouterProvider } from "react-router-dom"
import Router from "@/routers/Router"

/**
 * Main component used to call the application router
 * @returns ReactElement
 */
const App = () => {
	return <RouterProvider router={Router} />
}

export default App
