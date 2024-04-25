import React from "react"
import { PropTypes } from "prop-types"

/**
 * KeyDataCard is a small card used to display the user's home info
 *
 * @param {object} icon
 * @param {object} data
 * @returns ReactElement
 */
const KeyDataCard = ({ icon, data }) => {
	return (
		<article className="group flex min-w-max items-center gap-7 rounded-md bg-tertiary p-7 transition-all hover:shadow-md">
			<img
				className="transition-transform group-hover:scale-110"
				src={icon.src}
				alt={icon.alt}
			/>
			<div>
				<p className="text-xl font-bold">
					{data.number}
					{data.unit}
				</p>
				<p className="test text-sm text-tertiary2">{data.text}</p>
			</div>
		</article>
	)
}

KeyDataCard.propTypes = {
	icon: PropTypes.shape({
		src: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired,
	}).isRequired,
	data: PropTypes.shape({
		number: PropTypes.string.isRequired,
		unit: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	}).isRequired,
}

export default KeyDataCard
