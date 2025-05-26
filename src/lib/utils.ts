import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera } from "../../types/canvas";

const colors = [
  '#e6194b', // red
  '#3cb44b', // green
  '#ffe119', // yellow
  '#0082c8', // blue
  '#f58231', // orange
  '#911eb4', // purple
  '#46f0f0', // cyan
  '#f032e6', // magenta
  '#d2f53c', // lime
  '#fabebe', // pink
  '#008080', // teal
  '#e6beff', // lavender
  '#aa6e28', // brown
  '#fffac8', // beige
  '#800000', // maroon
  '#aaffc3', // mint
  '#808000', // olive
  '#ffd8b1', // apricot
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