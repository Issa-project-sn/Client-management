import { Timestamp } from 'firebase/firestore';

export const convertFirestoreDate = (date: any): Date | null => {
  if (!date) return null;
  if (date instanceof Timestamp) {
    return date.toDate();
  }
  if (date instanceof Date) {
    return date;
  }
  return null;
};