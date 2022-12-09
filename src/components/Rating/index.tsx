import React from "react";

export const RenderStarComponent = ({ numberStar }: { numberStar: number }) => {
	const renderStart = () => {
		if (numberStar <= 1) {
			return <i className="fa-solid fa-star"></i>;
		} else if (numberStar <= 2) {
			return (
				<>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
				</>
			);
		} else if (numberStar <= 3) {
			return (
				<>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
				</>
			);
		} else if (numberStar <= 4) {
			return (
				<>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
				</>
			);
		} else {
			return (
				<>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
					<i className="fa-solid fa-star"></i>
				</>
			);
		}
	};

	return <div className="render-start">{renderStart()}</div>;
};
