import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import birthdayicon from "../../assets/celebrationicon/birthdayicon.png";
import micheal from "../../assets/celebrationicon/micheal.png";

const Celebration = () => {
  const birthdays = [
    {
      name: "John Micheal",
      role: "Leader Designer",
      avatar: micheal,
      birthdayicon: birthdayicon,
      date: "jan 23",
    },
    {
      name: "John Micheal",
      role: "Leader Designer",
      avatar: micheal,
      birthdayicon: birthdayicon,
      date: "jan 23",
    },
    {
      name: "John Micheal",
      role: "Leader Designer",
      avatar: micheal,
      birthdayicon: birthdayicon,
      date: "jan 23",
    },
  ];
  return (
    <div className=" flex flex-col space-y-2 bg-[#fff] shadow-lg rounded-lg">
      <p className="text-xl font-bold text-[#000] capitalize">celebration</p>
      <div className="bg-[#E1E1E1] h-12 rounded-full flex items-center mx-2">
        <span className="bg-[#fff] text-[#000] ml-2 capitalize  text-base font-semibold py-2 px-6 rounded-full text-center">
          birthday
        </span>
      </div>
      <div className="flex flex-col mt-10">
        <div className="flex justify-between">
          <p className="text-[#878787] text-base capitalize">Today</p>
          <button>
            <FaChevronUp className="w-4 h-4 text-[#878787]" />
          </button>
        </div>
        <div className="flex flex-col space-y-3">
          {birthdays.map((birthday) => (
            <div
              key={birthday.id}
              className="bg-[#EBEFFA] flex justify-between px-4 mx-2 rounded-xl py-2 items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={birthday.avatar}
                  alt={birthday.name}
                  className="w-10 h-10 rounded-full ring-0"
                />
                <span className="flex flex-col">
                  <p className="text-base text-[#545454] capitalize">
                    {birthday.name}
                  </p>
                  <p className="text-xs text-[#545454] capitalize">
                    {birthday.role}
                  </p>
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={birthday.birthdayicon}
                  alt={birthday.birthdayicon}
                  className="text-[#545454] w-6 h-6"
                />
                <p className="text-[#171717] text-base">{birthday.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <p className="text-[#878787] text-base capitalize">
            Upcoming Birthdays
          </p>
          <button>
            <FaChevronDown className="w-4 h-4 text-[#878787]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Celebration;
