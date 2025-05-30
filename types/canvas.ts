export type color = {
    r: number;
    g: number;
    b: number;
};

export type Camera = {
    x: number;
    y: number;
};
export enum LayerType {
    Rectangle,
    Ellipse,
    Text,
    Note,
    Path,
}

export type RectangleLayer = {
    type: LayerType.Rectangle;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: color;
    value?: string; // For text or note layers
}

export type EllipseLayer = {
    type: LayerType.Ellipse;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: color;
    value?: string; // For text or note layers
}

export type PathLayer = {
    type: LayerType.Path;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: color;
    points: number[][]; // Array of points for the path
    value?: string; // For text or note layers
}

export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: color;
    value?: string; // Text content
}

export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: color;
    value: string; // Note content
}

export type Point = {
    x: number;
    y: number;
}

export type XYWH = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
}

export type CanvasState =
    | {
        mode: CanvasMode.None;
    }
    | {
        mode: CanvasMode.Pressing;
        origin: Point;
    }
    | {
        mode: CanvasMode.SelectionNet;
        origin: Point;
        current?: Point;
    }
    | {
        mode: CanvasMode.Translating;
        current: Point;
    }
    | {
        mode: CanvasMode.Resizing;
        initialBounds: XYWH;
        corner: Side;
    }
    | {
        mode: CanvasMode.Inserting;
        layerType: LayerType.Ellipse | LayerType.Rectangle |
        LayerType.Text | LayerType.Note | LayerType.Path;
    }
    | {
        mode: CanvasMode.Pencil;

    };

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Resizing,
    Inserting,
    Pencil,
}

export type Layer = RectangleLayer | EllipseLayer | TextLayer | NoteLayer | PathLayer;