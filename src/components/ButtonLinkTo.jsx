import React from "react"
import { Link } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6"
import { PropTypes } from "prop-types"

/**
 * This component is a link button.
 *
 * @param {string} to - the link
 * @param {string} content - the text of the button
 * @returns {function} React component
 *
 * @see https://devdojo.com/tailwindcss/buttons
 */
const ButtonLinkTo = ({ to, content }) => {
	return (
		<Link
			to={to}
			className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-black p-4 px-6 py-3 font-medium text-black shadow-md transition duration-300 ease-out"
		>
			<span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-black text-white duration-300 group-hover:translate-x-0">
				<FaArrowRightLong className="size-7" />
			</span>
			<span className="ease absolute flex h-full w-full transform items-center justify-center text-black transition-all duration-300 group-hover:translate-x-full">
				{content}
			</span>
			<span className="invisible relative">{content}</span>
		</Link>
	)
}

ButtonLinkTo.propTypes = {
	to: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
}

export default ButtonLinkTo
