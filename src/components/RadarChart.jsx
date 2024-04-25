import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

const RadarChart = ({ data }) => {
	const ref = useRef()
	const [parentHeight, setParentHeight] = useState(0)
	const [parentWidth, setParentWidth] = useState(0)

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
		const size = Math.max(210, Math.min(parentWidth, parentHeight))
		const polygon = { number: 5, spacing: 20 }

		if (parentHeight && parentWidth) {
			const svg = d3
				.select(ref.current)
				.attr("viewBox", [0, 0, parentWidth, parentHeight])
				.style("width", "100%")
				.style("height", "100%")

			// Reset all SVG content
			svg.selectAll("*").remove()

			const centerX = parentWidth / 2
			const centerY = parentHeight / 2

			const adjustTextPositionX = [
				25,
				0,
				Math.max(-40, -(parentWidth / 6)),
				Math.max(-30, -(parentWidth / 8)),
				0,
				25,
			]
			const adjustTextPositionY = [8, 16, 8, 0, -8, 0]

			/**
			 *
			 * @param {*} data
			 * @returns
			 */
			const normalizeValues = (data, normalizationValue) => {
				let maxValue = 0
				let valuesArrayOutOfHundred = []

				for (const el of data) {
					if (el.value > maxValue) {
						maxValue = el.value
					}
				}

				for (const el of data) {
					valuesArrayOutOfHundred.push(
						(el.value / maxValue) * normalizationValue,
					)
				}

				return valuesArrayOutOfHundred
			}

			/**
			 *
			 * @param {*} size
			 * @returns
			 */
			const handlePolygon = (size, isMain, data) => {
				let points = []

				for (const i of data.data) {
					let angle = ((2 * Math.PI) / 6) * (i.kind - 1)
					let x = centerX + size * Math.cos(angle)
					let y = centerY + size * Math.sin(angle)
					points.push([x, y])

					if (isMain) {
						let radians = 30 * (Math.PI / 180)
						let textX =
							centerX +
							(x - centerX) * Math.cos(radians) -
							(y - centerY) * Math.sin(radians) -
							20
						let textY =
							centerY +
							(x - centerX) * Math.sin(radians) +
							(y - centerY) * Math.cos(radians)

						svg
							.append("text")
							.attr("x", textX + adjustTextPositionX[i.kind - 1])
							.attr("y", textY + adjustTextPositionY[i.kind - 1])
							.text(`${data.kind[i.kind]}`)
							.attr("font-family", "Roboto")
							.attr("font-weight", "500")
							.style("text-transform", "capitalize")
							.attr("font-size", `${Math.min(12, parentWidth / 18)}px`)
							.attr("fill", "#fff")
					}
				}

				return points.join(" ")
			}

			/**
			 *
			 * @param {*} data
			 * @returns
			 */
			const handleShape = (data, size) => {
				let points = []
				let normalizedValues = normalizeValues(data.data, size - 170)

				for (const i of data.data) {
					let angle = ((2 * Math.PI) / 6) * (i.kind - 1)
					let polySize = normalizedValues[i.kind - 1]
					let x = centerX + polySize * Math.cos(angle)
					let y = centerY + polySize * Math.sin(angle)

					points.push([x, y])
				}

				return points.join(" ")
			}

			for (let i = 0; i < polygon.number; i++) {
				let isMain = false
				let polySize = size - 170 - polygon.spacing * i

				if (i === 0) {
					isMain = true
				}

				if (polySize > 0) {
					svg
						.append("polygon")
						.attr("points", handlePolygon(polySize, isMain, data))
						.attr("stroke", "#fff")
						.attr("fill", "none")
						.attr("transform", `rotate(30, ${centerX}, ${centerY})`)
				}
			}

			svg
				.append("polygon")
				.attr("points", handleShape(data, size))
				.attr("stroke", "rgba(255, 1, 1, 1)")
				.attr("fill", "rgba(255, 1, 1, 0.70)")
				.attr("transform", `rotate(30, ${centerX}, ${centerY})`)
		}
	}, [data, parentHeight, parentWidth])

	return <svg ref={ref}></svg>
}

export default RadarChart
