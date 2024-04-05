import React, { useEffect } from "react"
import { useOutletContext, useParams } from "react-router-dom"

const Home = () => {
	const [user] = useOutletContext()

	console.log(user)

	return <main>home</main>
}

export default Home
