import { format } from 'date-fns';


export function formatTimestamp(date) {
  return format(date, 'MMM dd, yyyy HH:MM:SS a');
}
