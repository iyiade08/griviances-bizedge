import DailyAttendance from "../Features/ActivItyFeatures/DailyAttendance";
import Activities from "../Features/ActivItyFeatures/Activities";
import Celebration from "../Features/ActivItyFeatures/Celebration";

const Activity = () => {
  return (
    <div className=" grid grid-cols-4 p-2 gap-4">
      <DailyAttendance />
      <Activities className="col-span-2" />
      <Celebration />
    </div>
  );
};

export default Activity;
