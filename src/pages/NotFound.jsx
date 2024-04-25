import React from "react"
import ButtonLinkTo from "@/components/ButtonLinkTo"

/**
 * NotFound is a component used when navigating the route below:
 *
 * { path: "*", element: <NotFound /> }
 *
 * @returns ReactElement
 */
const NotFound = () => {
	return (
		<main className="flex h-screen flex-col items-center justify-evenly gap-8">
			<h1 className="text-9xl font-medium">404</h1>
			<div className="w-5/6 max-w-5xl text-center">
				<p className="pb-12 text-center text-4xl">
					Cette page n'existe pas ! Cliquez sur le lien ci-dessous pour revenir
					sur le site
				</p>
				<ButtonLinkTo
					to={"/"}
					content={"Retourner à l'accueil"}
				/>
			</div>
		</main>
	)
}

export default NotFound
