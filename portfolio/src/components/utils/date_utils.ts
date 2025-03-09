import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

export const formatDuration = (start: string, end?: string): string => {
  const startDate = dayjs(start, "YYYY-MM-DD");
  const endDate = end ? dayjs(end, "YYYY-MM-DD") : dayjs(); // Default to current date if end is null

  const totalMonths = endDate.diff(startDate, "months");
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const startText = startDate.format("MMMM YYYY");
  const endText = end ? endDate.format("MMMM YYYY") : "Present";

  let durationText = "";
  if (years) {
    durationText += `${years} year${years > 1 ? "s" : ""}`;
  }
  if (months) {
    durationText +=
      (years ? " " : "") + `${months} month${months > 1 ? "s" : ""}`;
  }
  durationText = durationText || "Just Started!"; // Fallback for same month case

  return `${startText} - ${endText} (${durationText})`;
};
