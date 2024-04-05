import React from "react"
import ButtonLinkTo from "@/components/ButtonLinkTo"

const ErrorBoundary = () => {
	return (
		<main className="flex h-screen flex-col items-center justify-evenly gap-8">
			<h1 className="text-9xl font-medium">Oops !</h1>
			<div className="w-5/6 max-w-5xl text-center">
				<p className="pb-12 text-center text-4xl">
					Quelque chose s'est mal passé
				</p>
				<ButtonLinkTo
					to={"/"}
					content={"Retourner à l'accueil"}
				/>
			</div>
		</main>
	)
}

export default ErrorBoundary
