import React from 'react';

export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
	x: number;
	y: number;
	width?: number;
	height?: number;
}

export const Tile = ({x = 1, y = 1, width = 1, height = 1, ...props}: TileProps) => {
	return (
		<div
			style={{
				...props.style,
				gridColumn: `${x} / span ${width}`,
				gridRow: `${y} / span ${height}`
			}}
			className="tiles-layout-item"
		>
			{props.children}
		</div>
	);
};