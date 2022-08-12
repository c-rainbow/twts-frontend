export function getFullname(username: string, displayName: string): string {
  if (username.toLocaleLowerCase() === displayName.toLocaleLowerCase()) {
    return displayName;
  }
  return `${displayName} (${username})`;
}
