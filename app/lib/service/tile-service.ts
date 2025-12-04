export class TileService {
	
  static findPosition(grid: number[][], cols: number, width: number, height: number) {
    let row = 0;

    while (true) {
      if (!grid[row]) {
        grid[row] = new Array(cols).fill(0);
      }

      for (let col = 0; col < cols; col++) {
        if (this.canPlace(grid, row, col, width, height, cols)) {
          for (let dy = 0; dy < height; dy++) {
            if (!grid[row + dy]) {
              grid[row + dy] = new Array(cols).fill(0);
            }
            for (let dx = 0; dx < width; dx++) {
              grid[row + dy][col + dx] = 1;
            }
          }

          return { x: col + 1, y: row + 1 };
        }
      }

      row++;
    }
  }

  static canPlace(
    grid: number[][],
    row: number,
    col: number,
    width: number,
    height: number,
    cols: number
  ) {

    if (col + width > cols) return false;

    for (let dy = 0; dy < height; dy++) {
      if (!grid[row + dy]) continue;
      for (let dx = 0; dx < width; dx++) {
        if (grid[row + dy][col + dx] === 1) return false;
      }
    }
    return true;
  }
}