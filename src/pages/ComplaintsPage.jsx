import { useState } from "react";
import { FaArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SelectComplaintType from "../Features/FileComplaint/SelectComplaintType";
import DateSelector from "../Features/FileComplaint/DateSelector";
import { FileImage } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import SelectWitness from "../Features/FileComplaint/SelectWitness";
import SelectEmployee from "../Features/FileComplaint/SelectEmployee";
import { addComplaint } from "../utils/mockComplaints";

const ComplaintsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general complaint");
  const [showinfo, setShowInfo] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState("hr");
  const [activeFrequency, setActiveFrequency] = useState("one time");
  const [selectedComplaintType, setSelectedComplaintType] = useState("");
  const [dateChosen, setDateChosen] = useState(null);
  const [description, setDescription] = useState("");
  const [filedAgainstEmployee, setFiledAgainstEmployee] = useState(null);
  const [witness, setWitness] = useState(null);

  const recipients = [
    { value: "hr", label: "HR" },
    { value: "line manager", label: "Line Manager" },
    { value: "both", label: "Both" },
  ];

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try {
      await addComplaint({
        complaintType: selectedComplaintType,
        date: dateChosen,
        description,
        submittedTo: activeTab,
        recipient: selectedRecipient,
        filedAgainstId: filedAgainstEmployee ? filedAgainstEmployee.id : null,
        witnessId: witness ? witness.id : null,
      });
      toast.success("Complaint filed successfully");
      navigate("/submittedcomplaint");
    } catch (err) {
      toast.error("Failed to file complaint");
      console.error(err);
    }
  };

  const isFormValid =
    selectedComplaintType.trim() !== "" &&
    description.trim() !== "" &&
    dateChosen !== null &&
    (activeTab !== "an employee" || filedAgainstEmployee !== null);

  return (
    <div className="mt-40 min-h-screen genLayout">
      <form
        onSubmit={handleSubmitComplaint}
        className="w-[45%] z-50 shadow-lg mx-auto p-4 flex flex-col space-y-2"
      >
        <div className="flex flex-col gap-y-3 mb-6 items-start pb-6 border-b border-b-[#E1E1E1]">
          <Link to="/" className="flex gap-1 items-center">
            <FaArrowLeft className="w-4 text-[#545454]/50 h-4 inline" />
            <p className="text-[#545454]">back</p>
          </Link>
          <div className="flex flex-col gap-y-1">
            <p className="text-[#000] capitalize font-bold text-xl">
              file a complaint
            </p>
            <p className="text-base capitalize text-[#878787]">
              Make a grievance about an employee or general working conditions
            </p>
          </div>
        </div>

        <div className="flex flex-col border p-2 gap-y-2 ">
          <div className="flex flex-col gap-y-1 mb-3">
            <p className="text-base font-semibold">
              Is this a general complaint or it’s about another employee?*
            </p>
            <div className="flex items-center gap-x-20 pl-10 h-12 bg-[#E1E1E1] rounded-md">
              <button
                type="button"
                onClick={() => setActiveTab("general complaint")}
                className="flex items-center gap-2"
              >
                <div
                  className={
                    activeTab === "general complaint"
                      ? "w-4 h-4 ring-2 ring-[#2898A4] rounded-full bg-[#2898A4]"
                      : "w-4 h-4 ring-1 ring-gray-500 rounded-full"
                  }
                ></div>
                <p className="text-[#000]/50 capitalize text-base">
                  general complaint
                </p>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("an employee")}
                className="flex items-center gap-2"
              >
                <div
                  className={
                    activeTab === "an employee"
                      ? "w-4 h-4 ring-2 ring-[#2898A4] rounded-full bg-[#2898A4]"
                      : "w-4 h-4 ring-1 ring-gray-500 rounded-full"
                  }
                ></div>
                <p className="text-[#000]/50 capitalize text-base">
                  an employee
                </p>
              </button>
            </div>
          </div>

          {activeTab === "an employee" && (
            <div className="flex flex-col gap-2">
              <SelectEmployee
                selectedEmployee={filedAgainstEmployee}
                setSelectedEmployee={setFiledAgainstEmployee}
              />
            </div>
          )}
          <div className="flex flex-col">
            <SelectComplaintType
              selected={selectedComplaintType}
              setSelected={setSelectedComplaintType}
            />
          </div>

          {activeTab === "an employee" && (
            <div className=" flex flex-col border mb-2 ">
              <span className="flex flex-col gap-2">
                <p className="text-[#000] capitalize font-bold text-base">
                  frequency
                </p>
                <p className="text-sm text-[#000]/50">
                  Is this a one time or a repeat behavior from the respondent?
                </p>
              </span>
              <div className="flex items-center gap-x-20 pl-10 h-12 bg-[#E1E1E1] rounded-md">
                <span className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2"
                    onClick={() => setActiveFrequency("one time")}
                  >
                    <div
                      className={
                        activeFrequency === "one time"
                          ? "w-4 h-4 ring-2 ring-[#2898A4] rounded-full bg-[#2898A4]"
                          : "w-4 h-4 ring-1 ring-gray-500 rounded-full"
                      }
                    ></div>
                  </button>
                  <p className="text-[#000]/50 capitalize text-base">
                    one time
                  </p>
                </span>
                <span className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2"
                    onClick={() => setActiveFrequency("repeated behaviour")}
                  >
                    <div
                      className={
                        activeFrequency === "repeated behaviour"
                          ? "w-4 h-4 ring-2 ring-[#2898A4] rounded-full bg-[#2898A4]"
                          : "w-4 h-4 ring-1 ring-gray-500 rounded-full"
                      }
                    ></div>
                  </button>
                  <p className="text-[#000]/50 capitalize text-base">
                    repeated behaviour
                  </p>
                </span>
              </div>
            </div>
          )}
          {activeFrequency === "repeated behaviour" && (
            <div className="flex flex-col">
              <p className="text-sm ">
                How many times has this incident occured
              </p>
              <input
                type="text"
                placeholder="enter a number"
                className="border border-[#E1E1E1] placeholder:text-base placeholder:text-[#636262]/50 p-2 text-left pl-2 rounded-md outline-none focus:outline-none text-base"
              />
            </div>
          )}
          <div className="flex mt-3 flex-col">
            <DateSelector
              chosenDate={dateChosen}
              setChosenDate={setDateChosen}
            />
          </div>

          <div className="flex mt-3 flex-col gap-2">
            <p className="text-[#000] text-base font-bold">
              Provide description of complaint in details*
            </p>
            <textarea
              placeholder="description"
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-[#E1E1E1] rounded-md px-4 py-3 font-normal focus:outline-none focus:ring-1 focus:ring-[#2898A4] text-[16px]"
            />
          </div>

          {activeTab === "an employee" && (
            <div className="flex flex-col gap-2">
              <SelectWitness
                selectedWitness={witness}
                setSelectedWitness={setWitness}
              />
            </div>
          )}

          <div className="flex mt-3 flex-col gap-2">
            <span className="flex relative items-center gap-2">
              <p className="text-[#000] text-base font-bold">
                Submit complaint to*
              </p>
              <button
                type="button"
                onClick={() => setShowInfo((prev) => !prev)}
              >
                <FaCircleInfo className="w-4 h-4 rounded-full bg-[#2898A4] text-[#fff]" />
              </button>
              {showinfo && (
                <p className="absolute bg-[#D6F2F5] top-8 w-72 p-3 rounded-lg text-sm border border-[#2898A4] z-10">
                  All complaints submitted to the HR can only be viewed by the
                  HR while all complaints submitted to the line manager can be
                  viewed by the HR and line manager.
                </p>
              )}
            </span>
            <div className="flex flex-col bg-[#E1E1E1] rounded-md p-3 gap-2">
              <p className="text-[#545454] text-base">
                Who should be able to see this complaint ?
              </p>
              <div className="flex gap-4">
                {recipients.map((recipient) => (
                  <button
                    type="button"
                    key={recipient.value}
                    onClick={() => setSelectedRecipient(recipient.value)}
                    className="flex items-center gap-2 px-2"
                  >
                    <span
                      className={
                        selectedRecipient === recipient.value
                          ? "w-4 h-4 rounded-full ring-2 ring-[#2898A4] bg-[#2898A4]"
                          : "w-4 h-4 rounded-full ring-1 ring-gray-400"
                      }
                    ></span>
                    <p
                      className={
                        selectedRecipient === recipient.value
                          ? "text-base font-semibold text-[#2898A4]"
                          : "text-base font-medium text-[#000]"
                      }
                    >
                      {recipient.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-base font-bold">Documents (Optional)</p>
            <div className="flex justify-between items-center border border-dashed border-[#2898A4] bg-[#EAF8FA] rounded-md p-2">
              <button type="button" className="flex gap-2 items-center">
                <FileImage className="w-6 h-6 text-[#2898A4]" />
                <p className="text-[#2898A4] mt-3 text-sm font-semibold">
                  image.jpg
                </p>
              </button>
              <button type="button">
                <FaTimes className="w-4 h-4 text-[#2898A4]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-3 justify-between items-center">
          <button
            type="button"
            className="text-[#2898A4] bg-[#EAF8FA] capitalize rounded-md px-6 py-2 w-[50%]"
          >
            cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={
              isFormValid
                ? "text-[#fff] bg-[#2898A4] capitalize rounded-md px-6 py-2 w-[50%]"
                : "text-[#fff] bg-[#2898A4]/40 cursor-not-allowed capitalize rounded-md px-6 py-2 w-[50%]"
            }
          >
            file complaint
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintsPage;
