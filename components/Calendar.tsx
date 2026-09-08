import { getMonthLv } from "@/lib/date";

export default function Calendar({ weddingDate }: { weddingDate: string }) {
  const date = new Date(weddingDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();

  const firstDayOfMonth = new Date(year, month, 1);
  // Pārvēršam, lai nedēļa sākas ar Pirmdienu (0 = Pirmdiena ... 6 = Svētdiena)
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = new Array(startOffset).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const weekdayLabels = ["P", "O", "T", "C", "Pk", "S", "Sv"];

  return (
    <div className="border rounded-lg p-4 max-w-xs mx-auto">
      <p className="text-center text-xl font-medium mb-3">
        {getMonthLv(date)} {year}
      </p>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            className="text-center text-[20px] text-neutral-400 font-medium"
          >
            {label}
          </div>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
          {week.map((day, di) => {
            const isWeddingDay = day === dayOfMonth;
            return (
              <div
                key={di}
                className={`aspect-square flex items-center justify-center rounded-full text-lg
                  ${day === null ? "" : "text-neutral-700"}
                  ${isWeddingDay ? "bg-neutral-900 text-white font-medium" : ""}
                `}
              >
                {day ?? ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}