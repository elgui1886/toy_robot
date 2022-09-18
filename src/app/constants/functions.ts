/**
 * Check whether value is null or undefined
 * @param value The value to be tested
 * @returns Whether is null or undefined
 */
 export function isNoU(value: any): boolean {
    return value === undefined || value === null;
  }
  
  /**
   * Check whether given string is empty, null or undefined
   * @param str The string to be tested
   * @returns Whether is empty, null or undefined
   */
  export function isEoNoU(str: string): boolean {
    return isNoU(str) || str === '';
  }