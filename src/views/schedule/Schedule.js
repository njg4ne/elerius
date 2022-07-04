import { ScheduleTable } from "./ScheduleTable";

export default function Schedule() {
  return (
    <div>
      <div className="flex flex-row marg1 justify-around">
        <div className="flex-shrink-0 ">
          <ScheduleTable></ScheduleTable>
        </div>
      </div>
    </div>
  );
}
