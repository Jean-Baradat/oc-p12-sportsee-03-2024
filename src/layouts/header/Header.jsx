import React from "react"
import logo from "@layouts/header/assets/logo.svg"
import { NavLink } from "react-router-dom"

const Header = () => {
	return (
		<header className="sticky top-0 col-span-2 h-24 bg-secondary shadow-header">
			<nav className="flex h-full w-full items-center justify-between gap-10 px-7">
				<div className="flex items-center gap-3 transition-colors">
					<div className="size-14">
						<img
							src={logo}
							alt="Logo de SportSee"
						/>
					</div>
					<h1 className="text-2xl font-normal text-primary">SportSee</h1>
				</div>
				<ul className="flex w-full justify-between gap-16 pl-10 pr-10 text-2xl text-white lg:pl-32 lg:pr-24">
					<li>
						<NavLink
							to=""
							className="hover:underline"
						>
							Accueil
						</NavLink>
					</li>
					<li>
						<NavLink
							to=""
							className="hover:underline"
						>
							Profil
						</NavLink>
					</li>
					<li>
						<NavLink
							to=""
							className="hover:underline"
						>
							Réglage
						</NavLink>
					</li>
					<li>
						<NavLink
							to=""
							className="hover:underline"
						>
							Communauté
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
