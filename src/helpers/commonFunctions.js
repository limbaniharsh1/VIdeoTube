export const formatTimeAgo = (isoDateString) => {
  if (!isoDateString) return ""; // No input provided

  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) return ""; // Invalid date

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const ranges = {
    year: 3600 * 24 * 365,
    month: 3600 * 24 * 30,
    week: 3600 * 24 * 7,
    day: 3600 * 24,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(ranges)) {
    const delta = Math.floor(seconds / secondsInUnit);
    if (delta >= 1) {
      return rtf.format(-delta, unit);
    }
  }

  return "Just now";
};

export const formatViewsCount = (views) => {
  if (views === null || views === undefined) return "";

  const absViews = Math.abs(views);

  if (absViews < 1000) {
    return views.toString();
  } else if (absViews < 1_000_000) {
    return (views / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (absViews < 1_000_000_000) {
    return (views / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else {
    return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
};

export const formatDuration = (seconds) => {
  if (seconds == null || isNaN(seconds)) return "";

  const totalSeconds = Math.floor(seconds);

  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const pad = (num) => num.toString().padStart(2, "0");

  if (hrs > 0) {
    // H:MM:SS
    return `${hrs}:${pad(mins)}:${pad(secs)}`;
  } else {
    // MM:SS
    return `${pad(mins)}:${pad(secs)}`;
  }
};

export const commonQuery = ({ title, value, page }) => {
  const params = new URLSearchParams();

  if (title && value) {
    params.set("title", title);
    params.set("value", value);
  }

  if (page) {
    params.set("page", page);
  }

  return `/?${params.toString()}`;
};
