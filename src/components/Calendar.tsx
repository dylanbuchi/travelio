import { themeStore } from "@/store/theme.store";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

export const Calendar = ({ value, onChange, disabledDates }: CalendarProps) => {
  const { theme } = themeStore();
  const isDarkMode = theme === "dark";

  const rangesColor = isDarkMode ? "black" : "teal";

  return (
    <DateRange
      minDate={new Date()}
      rangeColors={[rangesColor]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      disabledDates={disabledDates}
    />
  );
};
