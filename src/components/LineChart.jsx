import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/**
 * Chart developed with D3.js
 *
 * This chart is a line graph
 *
 * @author Jean Baradat
 * @version 1.0.0
 *
 * @param {object} data - user data
 * @returns ReactElement
 */
const LineChart = ({ data }) => {
	const ref = useRef()
	const [parentHeight, setParentHeight] = useState(0)
	const [parentWidth, setParentWidth] = useState(0)

	// Creating the tooltip
	let tooltip = d3.select("main").select("div.tooltip-line-chart")
	if (tooltip.empty()) {
		tooltip = d3
			.select("main")
			.append("div")
			.attr("class", "tooltip-line-chart")
			.attr(
				"style",
				`position: absolute;
				visibility: hidden;
				background: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 0.5rem 0.5rem;
				color: #000;
				border-radius: .2rem;
				font-size: 0.8rem;
				gap: 1rem;
				box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
				opacity: 0;
				transition: opacity 0.3s ease;`,
			)
	}

	/**
	 * This function is executed at creation time and each time the size of the user's
	 * window changes. It retrieves the height and width of ref.current's parent element
	 */
	const handleResize = () => {
		setParentHeight(
			parseFloat(window.getComputedStyle(ref.current.parentElement).height),
		)
		setParentWidth(
			parseFloat(window.getComputedStyle(ref.current.parentElement).width),
		)
	}

	/**
	 * Used to add an event listener to resize and to destroy it
	 */
	useEffect(() => {
		window.addEventListener("resize", handleResize)

		handleResize()

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	useEffect(() => {
		const marginTop = 30
		const marginRight = 5
		const marginBottom = 40
		const marginLeft = 5
		const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"]

		if (parentHeight && parentWidth) {
			// Creating scales for the chart
			const x = d3
				.scaleBand()
				.domain(data.map(d => d.day))
				.range([marginLeft, parentWidth - marginRight])

			const y = d3
				.scaleLinear()
				.domain([
					d3.min(data.map(el => el.sessionLength)) - 15,
					d3.max(data.map(el => el.sessionLength)) + 20,
				])
				.range([parentHeight - marginBottom, marginTop])

			// Define SVG and dimensions
			const svg = d3
				.select(ref.current)
				.attr("viewBox", [0, 0, parentWidth, parentHeight])
				.style("width", "100%")
				.style("height", "100%")

			// Reset all SVG content
			svg.selectAll("*").remove()

			// Creation of the x axis
			const xAxis = d3
				.axisBottom()
				.scale(x)
				.tickFormat(d => daysOfWeek[d - 1])
				.tickSize(0)

			svg
				.append("g")
				.attr("class", "x-axis")
				.attr("transform", `translate(0, ${parentHeight - marginBottom})`)
				.call(xAxis)
				.style("color", "rgba(255, 255, 255, 0.5)")
				.style("font-family", "Roboto")
				.call(xAxis => xAxis.select(".domain").remove())

			svg.select(".x-axis").selectAll("text").style("font-size", "12px")

			// Creating the chart title
			svg
				.append("text")
				.attr("x", 30)
				.attr("y", 30)
				.style("fill", "rgba(255, 255, 255, 0.5)")
				.style("font-family", "Roboto")
				.style("font-size", "15px").html(`
					<tspan x="30" dy="1.2em">
						Durée moyenne des 
					</tspan>
					<tspan x="30" dy="1.2em">
						sessions
					</tspan>
					`)

			// Add the line
			svg
				.append("path")
				.datum(data)
				.attr("transform", `translate(${x.bandwidth() * 0.5}, 0)`)
				.attr("fill", "none")
				.attr("stroke", "#fff")
				.attr("stroke-width", 2)
				.attr(
					"d",
					d3
						.line()
						.x(d => {
							return x(d.day)
						})
						.y(d => {
							return y(d.sessionLength)
						})
						.curve(d3.curveCardinal),
				)

			// Handle and create all hover effects
			svg
				.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("transform", `translate(${x.bandwidth() * 0.5}, 0)`)
				.attr("x", d => x(d.day))
				.attr("y", 0)
				.attr("width", x.bandwidth())
				.attr("height", parentHeight)
				.style("fill", "transparent")
				.on("mouseover", (event, d) => {
					d3.select(event.currentTarget).style("fill", "rgba(0, 0, 0, 0.1)")

					let nextElement = event.currentTarget.nextSibling
					while (nextElement) {
						d3.select(nextElement).style("fill", "rgba(0, 0, 0, 0.1)")
						nextElement = nextElement.nextSibling
					}

					svg
						.append("circle")
						.attr("class", "circle-line-chart")
						.attr("transform", `translate(${x.bandwidth() * 0.5}, 0)`)
						.attr("cx", x(d.day))
						.attr("cy", y(d.sessionLength))
						.attr("r", 5)
						.style("fill", "#fff")
						.style("stroke", "rgba(255, 255, 255, 0.2)")
						.style("stroke-width", 10)

					tooltip
						.style("visibility", "visible")
						.html(
							`
						<span>
							${d.sessionLength} min
						</span>
						`,
						)
						.style("opacity", "1")
				})
				.on("mousemove", event => {
					tooltip
						.style("top", event.pageY - 35 + "px")
						.style("left", event.pageX + 15 + "px")
				})
				.on("mouseout", (event, _) => {
					d3.select(event.currentTarget).style("fill", "transparent")

					let nextElement = event.currentTarget.nextSibling
					while (nextElement) {
						d3.select(nextElement).style("fill", "transparent")
						nextElement = nextElement.nextSibling
					}

					tooltip.style("visibility", "hidden").style("opacity", "0")

					svg.selectAll("circle.circle-line-chart").remove()
				})
		}
	}, [data, parentHeight, parentWidth, tooltip])

	return <svg ref={ref}></svg>
}

export default LineChart
