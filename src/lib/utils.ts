import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "../../types/canvas";

const colors = [
  '#e6194b', // red
  '#3cb44b', // green
  '#f1c40f', // yellow
  '#0082c8', // blue
  '#f58231', // orange
  '#911eb4', // purple
  '#46f0f0', // cyan
  '#f032e6', // magenta
  '#d2f53c', // lime
  '#ff69b4', // pink
  '#008080', // teal
  '#9b59b6', // lavender
  '#aa6e28', // brown
  '#e67e22', // beige
  '#800000', // maroon
  '#1abc9c', // mint
  '#808000', // olive
  '#d35400', // apricot
  '#000080', // navy
  '#808080', // grey
]

export function getRandomColor(connectionId: number): string {
  return colors[connectionId % colors.length];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera) {
  return ({
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y
  })
}

export function colorToCSSColor(color: color) {
  if (!color) {
    return "#000"; // Default to black if no color is provided
  }
  const result = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;

  return result;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  }

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(bounds.x - point.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(bounds.y - point.y);
  }


  return result;
}

export function findIntersectingLayers(layerIds: readonly string[], layers: ReadonlyMap<string, Layer>, a: Point, b: Point) {

  console.log("findIntersectingLayers", layerIds, a, b);

  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y)
  }

  const ids = [];


  for (const layerId of layerIds) {
    const layer = layers.get(layerId);
    if (layer == null) {
      continue
    }

    const { x, y, height, width } = layer;
    if (rect.x + rect.width > x && rect.x < x + width &&
      rect.y + rect.height > y && rect.y < y + height) {
      ids.push(layerId);
    }


  }

  console.log("findIntersectingLayers result", ids);
  return ids;

}

export function getContrastingColor(color: color): string {
  // Calculate luminance using the YIQ formula
  const yiq = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
  // Return black for light backgrounds, white for dark backgrounds
  return yiq >= 128 ? "#000" : "#fff";
}

export function penPointToPathLayer(points: number[][], color: color): PathLayer {
  if (points.length < 2) {
    throw new Error("At least two points are required to create a path layer");
  }
  let left = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point
    if (left > x) {
      left = x;
    }
    if (right < x) {
      right = x;
    }
    if (top > y) {
      top = y;
    }
    if (bottom < y) {
      bottom = y;
    }
  }
  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([X, y, pressure]) => [X - left, y - top]),
    value: "",
  }
}

export function getSVGPathFromStroke(stroke: number[][]) {
  if (!stroke.length) {
    return "";
  }
  const d = stroke.reduce((acc, [x0, y0], i, arr) => {
    const [x1, y1] = arr[(i + 1) % arr.length];
    acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
    return acc;
  },
    ["M", ...stroke[0], "Q"]
  );
  d.push("Z"); // Close the path
  return d.join(" ");
}