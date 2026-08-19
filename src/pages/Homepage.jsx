import Welcome from "../component/Welcome";
import Activity from "../component/Activity";
import Timeoff from "../component/Timeoff";
import Benefits from "../component/Benefits";

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen space-y-3 genLayout mt-[150px]">
      <Welcome />
      <Activity />
      <Timeoff />
      <Benefits />
    </div>
  );
};

export default Homepage;
