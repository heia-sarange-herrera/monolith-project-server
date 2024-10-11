export function serializedData(data: string): string {
  const usernameFix = String(data).replace(/\s+/g, "").toLowerCase();
  return usernameFix;
}
