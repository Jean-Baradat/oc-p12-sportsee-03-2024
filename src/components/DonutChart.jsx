import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/**
 * Chart developed with D3.js
 *
 * This chart is a donut graph
 *
 * @author Jean Baradat
 * @version 1.0.0
 *
 * @param {number} data - score number
 * @returns ReactElement
 */
const DonutChart = ({ data }) => {
	const ref = useRef()
	const [parentHeight, setParentHeight] = useState(0)
	const [parentWidth, setParentWidth] = useState(0)
	const [dataReady] = useState([data, 1 - data])

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
		const size = Math.min(parentWidth * 1.25, parentHeight)
		const outerRadius = size / 2 - 40
		const innerRadius = outerRadius * 0.85

		if (parentHeight && parentWidth) {
			// Define SVG and dimensions
			const svg = d3
				.select(ref.current)
				.attr("viewBox", [
					-parentWidth / 2,
					-parentHeight / 2,
					parentWidth,
					parentHeight,
				])
				.style("width", "100%")
				.style("height", "100%")

			// Reset all SVG content
			svg.selectAll("*").remove()

			// Creating the chart title
			svg
				.append("text")
				.attr("x", (-parentWidth + 50) / 2)
				.attr("y", -100)
				.style("font-family", "Roboto")
				.style("font-size", "15px")
				.text("Score")

			// Creating an arc with an inner and outer radius
			const arc = d3
				.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius)
				.cornerRadius(10)

			// Creating a pie for each "d"
			const pie = d3.pie().value(d => d)

			// Associates a color and path for each pie
			svg
				.datum(dataReady)
				.selectAll("path")
				.data(pie)
				.join("path")
				.attr("fill", (_, i) => (i === 0 ? "#ff0000" : "#fbfbfb"))
				.attr("d", arc)

			// Creation of a white circle in the inside zone
			svg.append("circle").attr("r", Math.abs(innerRadius)).attr("fill", "#fff")

			// Add text information to the center of the circle
			svg
				.append("text")
				.attr("x", parentWidth / 2)
				.attr("y", -20)
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "middle").html(`
                <tspan style="font-size: ${Math.min(26, parentWidth / 9)}px; font-weight: 700; fill: #282D30;" 
                       x="2" 
                       dy="0">
                    ${dataReady[0] * 100}%
                </tspan>
                <tspan style="font-size: ${Math.min(16, parentWidth / 13)}px; font-weight: 500; fill: #74798C;" 
                       x="1" 
                       dy="1.8em">
                    de votre
                </tspan>
                <tspan style="font-size: ${Math.min(16, parentWidth / 13)}px; font-weight: 500; fill: #74798C;" 
                       x="-1" 
                       dy="1.2em">
                    objectif
                </tspan>
                `)
		}
	}, [dataReady, parentHeight, parentWidth])

	return <svg ref={ref}></svg>
}

export default DonutChart
