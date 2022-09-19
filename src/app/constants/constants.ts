import { GameConfig } from "../models/models";

export const rowNumber = 5;
export const columnNumber = 5;

export const maxRowNumber = 30;
export const maxColumnNumber = 30;

/**
 * Default game initialization if no configuration is passed
 */
export const Config: GameConfig = {
    rowNumber: rowNumber,
    columnNumber: columnNumber
}
