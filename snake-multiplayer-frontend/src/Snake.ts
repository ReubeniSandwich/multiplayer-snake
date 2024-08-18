
export interface Snake {
    name: string;
    id: number;
    facingDirection: Direction;
    body: BodyPart[];
}

export interface BodyPart {
    x: number;
    y: number;
    color: ColorRgba
}

export interface ColorRgba {
    red: number;
    green: number;
    blue: number;
    opacity: number;
}

export enum Direction {
    LEFT, RIGHT, DOWN, UP
}