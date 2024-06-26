import React from "react"
import item1 from "@layouts/aside/assets/item-1.svg"
import item2 from "@layouts/aside/assets/item-2.svg"
import item3 from "@layouts/aside/assets/item-3.svg"
import item4 from "@layouts/aside/assets/item-4.svg"

/**
 * Aside is the application's global vertical menu
 *
 * @todo Navigation
 *
 * @returns ReactElement
 */
const Aside = () => {
	return (
		<aside className="h-full w-28 bg-secondary shadow-aside">
			<div className="sticky top-24 flex h-[calc(100vh-6rem)] flex-col justify-between overflow-y-auto">
				<div className="mt-10 flex grow flex-col items-center justify-center gap-4">
					<img
						src={item1}
						alt="Meditation"
						className="cursor-pointer transition-all hover:scale-105"
					/>
					<img
						src={item2}
						alt="Swimming"
						className="cursor-pointer transition-all hover:scale-105"
					/>
					<img
						src={item3}
						alt="Bike"
						className="cursor-pointer transition-all hover:scale-105"
					/>
					<img
						src={item4}
						alt="Workout"
						className="cursor-pointer transition-all hover:scale-105"
					/>
				</div>
				<div className="relative h-56 min-h-56">
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap text-xs text-white">
						Copiryght, SportSee 2024
					</div>
				</div>
			</div>
		</aside>
	)
}

export default Aside
