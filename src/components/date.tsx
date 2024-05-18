import { parseISO, format } from "date-fns";

interface Props {
  dateString: string;
  className?: string;
}

export default function Date({ dateString, className }: Props) {
  const date = parseISO(dateString || "2020-06-02");
  return (
    <time dateTime={dateString} className={className}>
      {format(date, "yyyy年MM月dd日")}
    </time>
  );
}
