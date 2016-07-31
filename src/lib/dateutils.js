
function getTimeWithPrefix(timeScalar) {
  const prefix = timeScalar < 10 ? '0' : '';
  return `${prefix}${timeScalar}`;
}

function normalizeHours(hours) {
  return hours > 12 ? hours % 12 : hours;
}

function getTimeDiffStr(milliseconds) {
  const seconds = milliseconds / 1000;

  if (seconds < 60) {
    return `${Math.trunc(seconds)}s`;
  } else if (seconds < 3600) {
    return `${Math.trunc(seconds / 60)}m`;
  } else if (seconds < 86400) {
    return `${Math.trunc(seconds / 3600)}h`;
  }

  return `${Math.trunc(seconds / 86400)}d`;
}

function localizeDate(timeStringUTC) {
  const date = new Date();
  date.setTime(Date.parse(timeStringUTC));
  return date;
}

function getDateDiff(timeStringUTC) {
  const now = Date.now();
  const then = localizeDate(timeStringUTC).getTime();
  return getTimeDiffStr(now - then);
}

function getTimeStr(date) {
  return `${getTimeWithPrefix(normalizeHours(date.getHours()))}:` +
  `${getTimeWithPrefix(date.getMinutes())}:` +
  `${getTimeWithPrefix(date.getSeconds())}`;
}

function getNowISOStr() {
  const date = new Date();
  date.setTime(Date.now());
  return date.toISOString();
}

export { getDateDiff, getTimeStr, getNowISOStr };
