import { format, getHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const getTimeOfDay = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = new Date();
  const zonedTime = utcToZonedTime(currentTime, timezone);
  const hours = getHours(zonedTime);

  if (hours >= 5 && hours < 12) {
    return 'Good Morning';
  } else if (hours >= 12 && hours < 17) {
    return 'Good Afternoon';
  } else if (hours >= 17 && hours < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

export const getFormattedDate = (): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = new Date();
  const zonedTime = utcToZonedTime(currentTime, timezone);

  return format(zonedTime, 'eeee, MMMM d');
};
