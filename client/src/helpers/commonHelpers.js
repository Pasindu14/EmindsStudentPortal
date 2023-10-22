export function formatDate(dateString) {
  if (!dateString) return ""; // Handle null or empty date string

  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("en-CA", options);
}
