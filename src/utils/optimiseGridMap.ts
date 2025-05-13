import { range } from "lodash";

type Point = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

const { min } = Math;

type BooleanMap = (number | boolean | string)[][];

function get(m: BooleanMap, { x, y }: Point) {
  return !!m?.[y]?.[x];
}

export function expand(
  m: BooleanMap,
  mode: boolean,
  { x, y }: Point,
  max: Point
) {
  let x1 = x;
  let y1 = y;

  // expand diagonally
  while (x1 + 1 <= max.x && y1 + 1 <= max.y) {
    const h = range(x, x1 + 1).map((i) => get(m, { x: i, y: y1 + 1 }));
    if (h.includes(!mode)) break;
    const v = range(y, y1 + 2).map((i) => get(m, { x: x1 + 1, y: i }));
    if (v.includes(!mode)) break;
    x1++;
    y1++;
  }

  // expand vertically
  while (y1 + 1 <= max.y) {
    const h = range(x, x1 + 1).map((i) => get(m, { x: i, y: y1 + 1 }));
    if (h.includes(!mode)) break;
    y1++;
  }

  // expand horizontally
  while (x1 + 1 <= max.x) {
    const v = range(y, y1 + 1).map((i) => get(m, { x: x1 + 1, y: i }));
    if (v.includes(!mode)) break;
    x1++;
  }

  return { x: x1, y: y1 };
}

export function optimiseGridMap(
  m: BooleanMap,
  size: Size,
  offset: Point = { x: 0, y: 0 },
  max: Point = { x: size.width - 1, y: size.height - 1 }
): (Point & Size)[] {
  const stack: [Point, Point][] = [[offset, max]];
  const result: (Point & Size)[] = [];
  while (stack.length > 0) {
    const [offset, max] = stack.pop()!;
    if (offset.x <= max.x && offset.y <= max.y) {
      const mode = get(m, offset);
      const b = expand(m, mode, offset, max);
      stack.push(
        [
          { x: offset.x, y: b.y + 1 },
          { x: min(max.x, b.x), y: max.y },
        ],
        [
          { x: b.x + 1, y: offset.y },
          { x: max.x, y: max.y },
        ]
      );
      if (mode) {
        result.push({
          ...offset,
          width: b.x - offset.x + 1,
          height: b.y - offset.y + 1,
        });
      }
    }
  }
  return result;
}
