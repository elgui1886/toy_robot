
export type Commands = 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT'
export enum Orientation {
    NORTH = 'NORTH',
    WEST = 'WEST',
    SOUTH = 'SOUTH',
    EAST = 'EAST'
}

export interface RobotState {
    row: number;
    column: number;
    orientation: Orientation;
}
export interface GameTable {
    row: any[];
    column: any[];
}
export interface GameConfig {
    rowNumber: number;
    columnNumber: number;
}