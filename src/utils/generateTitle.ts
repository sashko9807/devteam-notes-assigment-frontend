export function generateTitle(title: string, suffix = "Note App") {
  if (title) {
    return `${title} | ${suffix}`;
  }
  return suffix;
}
