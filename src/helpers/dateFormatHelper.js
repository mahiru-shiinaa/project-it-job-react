function formatDateTime(dateInput) {
  const date = new Date(dateInput);

  const padZero = (num) => (num < 10 ? '0' + num : num);

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // getMonth() trả về 0–11
  const year = date.getFullYear();

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = { formatDateTime };
