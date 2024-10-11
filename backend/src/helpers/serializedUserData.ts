
/**
 *  changed the string data into lowercase and contained it in a temporary variable that the function returns.
 */
export function serializedData(data: string): string {
  const usernameFix = String(data).replace(/\s+/g, "").toLowerCase();
  return usernameFix;
}
