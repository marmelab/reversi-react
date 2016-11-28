export function create(width, height, value = 0) {
    const cells = [];

    for (let y = 0; y < height; y += 1) {
        cells[y] = [];
        for (let x = 0; x < width; x += 1) {
            cells[y][x] = value;
        }
    }

    return cells;
}
