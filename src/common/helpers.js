export function getDifferenceInDays(from, to) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const differenceInMilliseconds = Math.abs(to - from);
  return Math.floor(differenceInMilliseconds / millisecondsPerDay);
}

export function getReadableLocalTime(timestamp) {
  return new Date(timestamp).toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
