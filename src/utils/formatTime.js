// One place for clock times like "7:45 PM", matching formatCurrency's locale.
const formatter = new Intl.DateTimeFormat('en-PH', { hour: 'numeric', minute: '2-digit' });

export default function formatTime(date) {
  return formatter.format(date);
}
