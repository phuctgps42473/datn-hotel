export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function countDayBetween(start, end) {
    const startDate = new Date(start.split('/').reverse().join('-')); // Convert DD/MM/YYYY to YYYY-MM-DD
    const endDate = new Date(end.split('/').reverse().join('-')); // Convert DD/MM/YYYY to YYYY-MM-DD
    const diffInMilliseconds = endDate - startDate;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return diffInDays;
}