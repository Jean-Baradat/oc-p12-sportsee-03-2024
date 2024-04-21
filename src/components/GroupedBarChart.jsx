import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

const BarChart = ({ data }) => {
	const ref = useRef()
	const [parentHeight, setParentHeight] = useState(0)
	const [parentWidth, setParentWidth] = useState(0)

	// Creating the tooltip
	let tooltip = d3.select("main").select("div.tooltip-grouped-bar-chart")
	if (tooltip.empty()) {
		tooltip = d3
			.select("main")
			.append("div")
			.attr("class", "tooltip-grouped-bar-chart")
			.attr(
				"style",
				`position: absolute;
				visibility: hidden;
				background: #ff0101;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 1.1rem 0.7rem;
				color: #fff;
				border-radius: .2rem;
				font-size: 0.8rem;
				gap: 1rem;
				box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`,
			)
	}

	/**
	 *
	 */
	const handleResize = () => {
		setParentHeight(
			parseFloat(window.getComputedStyle(ref.current.parentElement).height),
		)
		setParentWidth(
			parseFloat(window.getComputedStyle(ref.current.parentElement).width),
		)
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize)

		handleResize()

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	useEffect(() => {
		const marginTop = 80
		const marginRight = 60
		const marginBottom = 60
		const marginLeft = 30

		if (parentHeight && parentWidth) {
			// Creating scales for the chart
			const x = d3
				.scaleBand()
				.domain(data.map(d => d.day))
				.range([marginLeft, parentWidth - marginRight])
				.paddingInner(0.7)

			const yScales = {
				kilogram: d3
					.scaleLinear()
					.domain([
						d3.min(data.map(el => el.kilogram)) - 2,
						d3.max(data.map(el => el.kilogram)) + 1,
					])
					.range([parentHeight - marginBottom, marginTop]),
				calories: d3
					.scaleLinear()
					.domain([
						d3.min(data.map(el => el.calories)) - 50,
						d3.max(data.map(el => el.calories)) + 50,
					])
					.range([parentHeight - marginBottom, marginTop]),
			}

			// Define SVG and dimensions
			const svg = d3
				.select(ref.current)
				.attr("viewBox", [0, 0, parentWidth, parentHeight])
				.style("width", "100%")
				.style("height", "100%")

			//
			svg.selectAll("*").remove()

			// Creation of the x axis
			const xAxis = d3
				.axisBottom()
				.scale(x)
				.tickSize(0)
				.tickPadding(25)
				.tickFormat(d => parseInt(d3.timeFormat("%d")(new Date(d))))

			svg
				.append("g")
				.attr("class", "x-axis")
				.attr("transform", `translate(0, ${parentHeight - marginBottom})`)
				.call(xAxis)
				.style("color", "#9B9EAC")
				.style("font-family", "Roboto")

			svg.select(".x-axis").selectAll("text").style("font-size", "14px")

			// Creation of the y axis
			const yAxis = d3
				.axisRight()
				.scale(yScales.kilogram)
				.ticks(3)
				.tickSize(-parentWidth + marginLeft + marginRight)
				.tickPadding(20)

			svg
				.append("g")
				.attr("class", "y-axis")
				.attr("transform", `translate(${parentWidth - marginRight}, 0)`)
				.call(yAxis)
				.style("font-family", "Roboto")
				.style("stroke-dasharray", "3")
				.style("color", "#9B9EAC")
				.select(".domain")
				.style("display", "none")

			svg.select(".y-axis").selectAll("text").style("font-size", "14px")

			// Creating the chart title
			svg
				.append("text")
				.attr("x", marginLeft)
				.attr("y", 35)
				.style("font-family", "Roboto")
				.style("font-size", "15px")
				.text("Activité quotidienne")

			// Creating the legend
			const legend = svg
				.append("g")
				.attr("class", "legend")
				.attr("transform", `translate(${parentWidth - marginRight}, 35)`)

			legend
				.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.attr("text-anchor", "end")
				.style("font-family", "Roboto")
				.style("font-size", "14px")
				.text("Calories brûlées (kCal)")

			legend
				.append("circle")
				.attr("cx", -160)
				.attr("cy", -5)
				.attr("r", 5)
				.style("fill", "#ff0101")

			legend
				.append("text")
				.attr("x", -200)
				.attr("y", 0)
				.attr("text-anchor", "end")
				.style("font-family", "Roboto")
				.style("font-size", "14px")
				.text("Poids (kg)")

			legend
				.append("circle")
				.attr("cx", -280)
				.attr("cy", -5)
				.attr("r", 5)
				.style("fill", "#020203")

			// Define the colors of the chart bars
			const color = d3
				.scaleOrdinal()
				.domain(["kilogram", "calories"])
				.range(["#020203", "#ff0101"])

			// Creating subgroups for weight/calorie pairs
			const xSubgroup = d3
				.scaleBand()
				.domain(["kilogram", "calories"])
				.range([0, x.bandwidth()])
				.paddingInner(0.4)

			// Position of even column groups
			const dayGroups = svg
				.selectAll(".dayGroups")
				.data(data)
				.join("g")
				.attr("class", "dayGroups")
				.attr("transform", d => `translate(${x(d.day)},0)`)

			// define group content
			dayGroups
				.selectAll("path")
				.data(d =>
					["kilogram", "calories"].map(key => ({ key: key, value: d[key] })),
				)
				.join("path")
				.attr("x", d => xSubgroup(d.key))
				.attr("y", d => yScales[d.key](d.value))
				.attr("width", xSubgroup.bandwidth())
				.attr("height", d =>
					Math.abs(parentHeight - marginBottom - yScales[d.key](d.value)),
				)
				.attr("fill", d => color(d.key))
				.attr("d", d => {
					const rx = xSubgroup.bandwidth() / 2.3
					const ry = xSubgroup.bandwidth() / 2.3

					return `
					M${xSubgroup(d.key)},${yScales[d.key](d.value) + ry}
					a${rx},${ry} 0 0 1 ${rx},${-ry}
					h${xSubgroup.bandwidth() - 2 * rx}
					a${rx},${ry} 0 0 1 ${rx},${ry}
					v${Math.abs(parentHeight - marginBottom - yScales[d.key](d.value) - ry)}
					h${-xSubgroup.bandwidth()}Z
					`
				})

			// Hover effect event on bar groups
			dayGroups
				.append("rect")
				.attr("x", -15)
				.attr(
					"y",
					parentHeight -
						marginBottom -
						(parentHeight - marginBottom - marginTop),
				)
				.attr("width", x.bandwidth() + 30)
				.attr("height", parentHeight - marginBottom - marginTop)
				.style("fill", "transparent")
				.on("mouseover", (event, d) => {
					d3.select(event.currentTarget).style(
						"fill",
						"rgba(196, 196, 196, 0.40)",
					)
					tooltip.style("visibility", "visible").html(`
						<span>
							${d.kilogram}kg
						</span>
						<span>
							${d.calories}kCal
						</span>
						`)
				})
				.on("mousemove", event => {
					tooltip
						.style("top", event.pageY + 20 + "px")
						.style("left", event.pageX + 20 + "px")
				})
				.on("mouseout", (event, _) => {
					d3.select(event.currentTarget).style("fill", "transparent")
					tooltip.style("visibility", "hidden")
				})
		}
	}, [data, parentHeight, parentWidth, tooltip])

	return <svg ref={ref}></svg>
}

export default BarChart
