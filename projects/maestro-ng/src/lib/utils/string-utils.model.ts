
export class StringUtils {

  public static isUndefinedOrEmpty(value: string): boolean {
    return value === null || value === undefined || value.trim() === '';
  }
}
