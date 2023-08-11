import { format, getHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const getZonedTime = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = new Date();
  return utcToZonedTime(currentTime, timezone);
};

export const getTimeOfDay = () => {
  const hours = getHours(getZonedTime());

  if (hours >= 5 && hours < 12) {
    return 'Good Morning';
  } else if (hours >= 12 && hours < 17) {
    return 'Good Afternoon';
  } else if (hours >= 17 && hours < 21) {
    return 'Good Evening';
  } else if (hours >= 21 && hours < 5) {
    return 'Good Night';
  }
};

export const getFormattedDate = (): string => {
  return format(getZonedTime(), 'eeee, MMMM d');
};
