export function normalizeUrl(input: string) {
  let url = input

  url = url.trim()
  if (url.endsWith("/")) {
    url = url.slice(0, -1)
  }
  return url
}
