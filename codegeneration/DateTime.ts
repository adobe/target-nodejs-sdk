export type DateTime = Date;

export function DateTimeFromJSON(value: any): Date {
  return new Date(value);
}

export function DateTimeFromJSONTyped(
  value: any,
  ignoreDiscriminator: boolean
): Date {
  return new Date(value);
}

export function DateTimeToJSON(value?: DateTime | null): any {
  return value != null && typeof value !== "undefined"
    ? value.toISOString()
    : "";
}
