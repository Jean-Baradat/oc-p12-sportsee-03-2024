import React from "react"
import item1 from "@layouts/aside/assets/item-1.svg"
import item2 from "@layouts/aside/assets/item-2.svg"
import item3 from "@layouts/aside/assets/item-3.svg"
import item4 from "@layouts/aside/assets/item-4.svg"

const Aside = () => {
	return (
		<aside className="shadow-aside flex h-full w-28 flex-col justify-between bg-secondary">
			<div className="mt-10 flex grow flex-col items-center justify-center gap-4">
				<img
					src={item1}
					alt=""
				/>
				<img
					src={item2}
					alt=""
				/>
				<img
					src={item3}
					alt=""
				/>
				<img
					src={item4}
					alt=""
				/>
			</div>
			<div className="relative h-56">
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap text-xs text-white">
					Copiryght, SportSee 2020
				</div>
			</div>
		</aside>
	)
}

export default Aside
