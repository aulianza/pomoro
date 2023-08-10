import { format, getHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const getZonedTime = () => {
  const timezone = 'Asia/Jakarta';
  const currentTime = new Date();
  return utcToZonedTime(currentTime, timezone);
};

export const getTimeOfDay = (): string => {
  const hours = getHours(getZonedTime());

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
  return format(getZonedTime(), 'eeee, MMMM d');
};
