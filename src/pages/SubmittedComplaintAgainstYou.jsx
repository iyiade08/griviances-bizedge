import Pagination from "../Features/SubmittedComplaints/Pagination";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getComplaintsAgainstEmployee } from "../utils/mockComplaints";

const SubmittedComplaintAgainstYou = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getComplaintsAgainstEmployee();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints against you", error);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="mt-40 flex flex-col space-y-4 genLayout min-h-screen p-16 ">
      {/* first section */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-[#000000] text-2xl font-bold capitalize text-center">
          complaints
        </p>
        <button type="button" onClick={() => navigate("/complaint")}>
          <p className="text-[#fff] py-4 px-10 rounded-lg bg-[#2898A4] capitalize text-center">
            file a complaint
          </p>
        </button>
      </div>
      {/* second section */}
      <div className="flex flex-col space-y-3 ">
        <span className="flex px-3 w-[18vw] py-2 h-10 rounded-full border items-center justify-between bg-[#E1E1E1]">
          <button
            type="button"
            onClick={() => navigate("/submittedcomplaint")}
            className="px-6 py-2"
          >
            <p className=" text-base capitalize font-semibold text-[#000]/50">
              reported by you
            </p>
          </button>
          <button type="button" className="bg-[#fff] px-6 py-2 rounded-full">
            <p className="text-base capitalize font-semibold text-[#000]/50">
              against you
            </p>
          </button>
        </span>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10 ">
            <div className="flex items-center bg-[#E1E1E1]/50 border rounded-lg  ">
              <span className="px-3 flex items-center">
                <button type="button">
                  <FaSearch className="text-[#000]/50 text-lg rounded-l-lg" />
                </button>
              </span>
              <input
                type="text"
                className="w-[15vw] h-10 bg-transparent outline-none pr-3 placeholder:text-md placeholder:text-[#000]/50 rounded-r-lg"
                placeholder="search complaint"
              />
            </div>
            <div className="flex gap-2 bg-[#E1E1E1]/50 px-5 py-3 rounded-lg items-center">
              <p className="text-[#000]/50 text-lg capitalize px-2">status</p>
              <ChevronDown className="w-5 h-5" />
            </div>
            <div className="flex gap-2 bg-[#E1E1E1]/50 px-5 py-3 rounded-lg items-center">
              <p className="text-[#000]/50 text-lg capitalize px-2">stage</p>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
          <Pagination
            start={complaints.length === 0 ? 0 : 1}
            end={complaints.length}
            total={complaints.length}
            onPrev={() => {}}
            onNext={() => {}}
          />
        </div>
      </div>
      {/* table header */}
      <div className="flex items-center bg-[#E1E1E1]/50 shadow-lg border mb-2 p-2">
        <div className="w-[25%] flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 cursor-pointer"
          />
          <p className="text-md capitalize text-[#000] font-semibold">
            Date of Complaint
          </p>
        </div>
        <p className="w-[25%] text-md capitalize text-[#000]">Complaint Type</p>
        <p className="w-[15%] text-md capitalize text-[#000]">Status</p>
        <p className="w-[15%] text-md capitalize text-[#000]">Stage</p>
        <p className="w-[20%] text-md capitalize text-[#000]">Decision</p>
      </div>

      {/* table rows */}
      <div className="flex flex-col">
        {complaints.length === 0 ? (
          <p className="text-center text-[#878787] py-8">
            No complaints filed against you.
          </p>
        ) : (
          complaints.map((item) => (
            <div key={item.id} className="flex items-center border-b p-2">
              <div className="w-[25%] flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <p className="text-sm text-gray-700">{item.dateReported}</p>
              </div>
              <p className="w-[25%] text-sm text-gray-700">
                {item.complaintType}
              </p>
              <p className="w-[15%] text-sm text-gray-700">{item.status}</p>
              <p className="w-[15%] text-sm text-gray-700">{item.stage}</p>
              <p className="w-[20%] text-sm text-gray-700">{item.decision}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubmittedComplaintAgainstYou;
