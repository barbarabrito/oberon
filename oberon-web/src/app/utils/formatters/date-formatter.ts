export function formatDate(value: string) {
  const date = new Date(value)

  const formattedDate = date.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  })

  return formattedDate
}
