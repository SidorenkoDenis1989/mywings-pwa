"use client";
import React, { useRef, useState, useEffect } from "react";
import { Tile } from "@ui/tile";
import { ControlButtons } from "@ui/control-buttons";
import { TileService } from "@service/tile-service";
import { TileEntity } from "../lib/entity/tile.enitity";

interface TilesLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	col?: number;
	gap?: number;
	tiles: TileEntity[];
	showControls?: boolean;
};

export const TilesLayout = ({
		col = 4, 
		gap = 15, 
		tiles = [], 
		showControls = false, 
		...props
	}: TilesLayoutProps) => {

	const containerRef = useRef<HTMLDivElement | null>(null);
  const [rowHeight, setRowHeight] = useState<number>(0);

	useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const columnWidth = (width - gap * (col - 1)) / col;

      setRowHeight(columnWidth);
    };

    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [col]);

  const grid: number[][] = [];
  const placedTiles = tiles.map((tile) => {
    const { width = 1, height = 1 } = tile;
    const pos = TileService.findPosition(grid, col, width, height);
    return { ...tile, ...pos };
  });

	return (
		<>
			{showControls && <ControlButtons style={{...props.style}} />}
      <div	
				ref={containerRef}
				className="tiles-layout-container"
				style={{
					...props.style,
					gridTemplateColumns: `repeat(${col}, 1fr)`,
					gridAutoRows: rowHeight ? `${rowHeight}px` : "auto",
					gap: `${gap}px`,
				}}
			>
				{!!placedTiles.length && placedTiles.map((tile, index) => {
					return (
						<Tile 
							{...tile}
							style={{
								...tile.style,
							}} 
							key={index} 
						/>
					);
				})}
			</div>
		</>
	);
};