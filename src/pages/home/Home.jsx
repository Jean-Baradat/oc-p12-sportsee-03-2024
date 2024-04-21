import React from "react"
import { useOutletContext } from "react-router-dom"
import caloriesIcon from "@pages/home/assets/calories-icon.svg"
import carbsIcon from "@pages/home/assets/carbs-icon.svg"
import lipidsIcon from "@pages/home/assets/lipids-icon.svg"
import proteinsIcon from "@pages/home/assets/proteins-icon.svg"
import KeyDataCard from "@components/KeyDataCard"
import GroupedBarChart from "@components/GroupedBarChart"
import LineChart from "@components/LineChart"

const Home = () => {
	const [user] = useOutletContext()

	return (
		<main className="mx-16 my-12 flex flex-col justify-between gap-y-12 xl:mx-24">
			<div>
				<h1 className="mb-10 text-5xl">
					Bonjour{" "}
					<span className="text-primary">
						{user.USER_MAIN_DATA.userInfos.firstName}
					</span>
				</h1>
				<p className="text-lg font-normal">
					Félicitation ! Vous avez explosé vos objectifs hier 👏
				</p>
			</div>
			<div className="grid h-full grid-cols-1 grid-rows-3 gap-8 lg:grid-cols-3fr-1fr lg:grid-rows-2">
				<article className="col-start-1 col-end-2 row-start-1 row-end-2 rounded-md bg-tertiary lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-1 lg:h-[265.5px]">
					<GroupedBarChart data={user.USER_ACTIVITY.sessions} />
				</article>
				<section className="col-start-1 col-end-2 row-start-3 row-end-4 grid grid-cols-3 grid-rows-1 gap-8 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 lg:h-[265.5px]">
					<article className="rounded-md bg-primary">
						<LineChart data={user.USER_AVERAGE_SESSIONS.sessions} />
					</article>
					<article className="rounded-md bg-secondary2">Graph 2</article>
					<article className="rounded-md bg-tertiary">Graph 3</article>
				</section>
				<section className="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col justify-between gap-4 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3">
					<KeyDataCard
						icon={{ src: caloriesIcon, alt: "Icône des calories" }}
						data={{
							number:
								user.USER_MAIN_DATA.keyData.calorieCount.toLocaleString(
									"en-US",
								),
							unit: "kCal",
							text: "Calories",
						}}
					/>
					<KeyDataCard
						icon={{ src: proteinsIcon, alt: "Icône des protéines" }}
						data={{
							number:
								user.USER_MAIN_DATA.keyData.proteinCount.toLocaleString(
									"en-US",
								),
							unit: "g",
							text: "Proteines",
						}}
					/>
					<KeyDataCard
						icon={{ src: carbsIcon, alt: "Icône des glucides" }}
						data={{
							number:
								user.USER_MAIN_DATA.keyData.carbohydrateCount.toLocaleString(
									"en-US",
								),
							unit: "g",
							text: "Glucides",
						}}
					/>
					<KeyDataCard
						icon={{ src: lipidsIcon, alt: "Icône des lipides" }}
						data={{
							number:
								user.USER_MAIN_DATA.keyData.lipidCount.toLocaleString("en-US"),
							unit: "g",
							text: "Lipides",
						}}
					/>
				</section>
			</div>
		</main>
	)
}

export default Home
