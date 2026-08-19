import TimeOffRequest from "../Features/TimeoffFeatures/TimeOffRequest";
import TimeoffRecord from "../Features/TimeoffFeatures/TimeoffRecord";

const Timeoff = () => {
  return (
    <div className="grid grid-cols-4 p-2 gap-4">
      <TimeOffRequest className="col-span-3" />
      <TimeoffRecord />
    </div>
  );
};

export default Timeoff;
