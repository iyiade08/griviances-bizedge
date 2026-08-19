import { useState } from "react";
import micheal from "../../assets/celebrationicon/micheal.png";

const TimeoffRecord = () => {
  const timeoffRecords = [
    {
      name: "john miceheal",
      avatar: micheal,
      role: "lead designer",
      timestamp: "(2days)",
      startday: "jan23",
      endday: "jan25, 2022",
    },
    {
      name: "john miceheal",
      avatar: micheal,
      role: "lead designer",
      timestamp: "(2days)",
      startday: "jan23",
      endday: "jan25, 2022",
    },
    {
      name: "john miceheal",
      avatar: micheal,
      role: "lead designer",
      timestamp: "(2days)",
      startday: "jan23",
      endday: "jan25, 2022",
    },
  ];

  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex flex-col bg-[#fff] space-y-2 shadow-lg rounded-md p-2">
      <div className="flex justify-between items-center">
        <p className="text-[#000] text-xl font-bold capitalize">
          timeoff record{" "}
        </p>
        <button>
          <p className="text-sm text-[#2898A4] capitalize">view all records</p>
        </button>
      </div>
      <div className="h-12 flex justify-between border  bg-[#E1E1E1] rounded-full">
        <div
          onClick={() => setActiveTab("upcoming")}
          className={
            activeTab === "upcoming"
              ? "flex items-center font-semibold py-2 ml-2 px-6 ml-4 bg-[#fff] rounded-full gap-1"
              : "font-bold text-[#000] flex items-center font-semibold px-2 ml-4"
          }
        >
          <p className="text-[#000] ">upcoming</p>
          <span className="w-6 h-6 rounded-full bg-[#FF6666] text-[#fff] text-center">
            3
          </span>
        </div>
        <div
          onClick={() => setActiveTab("ongoing")}
          className={
            activeTab === "ongoing"
              ? "flex items-center font-semibold py-2 px-6 mr-2 mr-4 bg-[#fff] rounded-full gap-1"
              : "font-bold text-[#000] flex items-center font-semibold px-2 mr-4"
          }
        >
          <p className="text-[#000] ">ongoing</p>
          <span className="w-6 h-6 rounded-full bg-[#FF6666] text-[#fff] text-center">
            3
          </span>
        </div>
      </div>
      {timeoffRecords.map((timeoffRecord) => (
        <div
          key={timeoffRecord.id}
          className="flex flex-col bg-[#FEF6E6]  rounded-lg p-3"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <img
                src={timeoffRecord.avatar}
                className="onject-cover w-10 h-10 rounded-full"
              />
              <span className="flex flex-col items-center">
                <p className="text-base capitalize text-[#000]">
                  {timeoffRecord.name}
                </p>
                <p className="text-sm text-[#545454]">{timeoffRecord.role}</p>
              </span>
            </div>
            <span className="bg-[#FCDC9C] text-[#946405] px-4 rounded-full flex items-center justify-center text-xs">
              {timeoffRecord.timestamp}
            </span>
          </div>
          <div className=" flex">
            <span className="flex gap-1">
              <p className="text-[#545454] border-r border-r-[#878787] pr-2">
                Start Date:<strong>{timeoffRecord.startday}</strong>
              </p>
              <p className="text-[#545454] pl-1">
                End Date:<strong>{timeoffRecord.endday}</strong>
              </p>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeoffRecord;
