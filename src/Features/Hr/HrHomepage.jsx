import YearToDatePicker from "./YearToDatePicker";
import FileComplaintBtn from "../../component/FileComplaintBtn";
import ComplaintDistributionChart from "./ComplaintDistributionChart";
import ColumnHeader from "./ColumnHeader";
import ComplaintRow from "./ComplaintRow";
import Spinner from "../../component/Spinner";
import {
  getComplaintTaggedToHr,
  deleteComplaint,
} from "../../utils/mockComplaints";
import { useState, useEffect } from "react";

const HrHomepage = () => {
  const [checked, setChecked] = useState(false);
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedIds, setSelectedIds] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(false);

  const complaintStats = [
    {
      value: "total complaints",
      count: complaints.length,
      BgColor: "#F2F2F2",
    },
    {
      value: "pending complaints",
      count: complaints.filter((c) => c.status === "pending").length,
      BgColor: "#FFE7E7",
    },
    {
      value: "open complaints",
      count: complaints.filter((c) => c.status === "open").length,
      BgColor: "#FDEDCE",
    },
    {
      value: "closed complaints",
      count: complaints.filter((c) => c.status === "closed").length,
      BgColor: "#E0EEF0",
    },
  ];

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const data = await getComplaintTaggedToHr();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleDelete = async (id) => {
    try {
      const updated = await deleteComplaint(id);
      setComplaints(updated);
    } catch (error) {
      console.error(error);
      alert("Deleting complaints isn't available yet.");
    } finally {
      setOpenMenuId(null);
    }
  };

  return (
    <section className="mt-40 flex flex-col min-h-screen genLayout ">
      {/* first section */}
      <div className=" flex justify-between ">
        <div className="flex items-center gap-4 pl-2 ">
          <p className="font-sans text-[#545454] text-xl capitalize">period</p>
          <YearToDatePicker />
        </div>
        <FileComplaintBtn />
      </div>
      {/* second section */}
      <div className="flex gap-4 mt-4 ">
        <div className="w-[60%] grid grid-cols-2 gap-2">
          {complaintStats.map((stat) => (
            <div
              key={stat.value}
              className={`flex flex-col p-4 px-4 rounded-xl shadow-md gap-2`}
              style={{ backgroundColor: stat.BgColor }}
            >
              <span className="text-lg capitalize text-start ">
                {stat.value}
              </span>
              <span className="text-lg text-end">{stat.count}</span>
            </div>
          ))}
        </div>
        <ComplaintDistributionChart />
      </div>
      {/* third section */}
      <div className="flex flex-col gap-4 mt-4">
        <h1 className="text-xl text-[#000] capitalize font-sans font-semibold mb-4">
          Recent Complaints
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex items-center bg-[#E1E1E1]/50 shadow-lg border mb-2 p-2 ">
            <div className="w-[16%] flex items-center gap-2 ">
              <ColumnHeader
                label="Date Reported"
                checked={checked}
                onCheck={() => setChecked((c) => !c)}
                sortDirection={sortDirection}
                onSortClick={() =>
                  setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
                }
              />
            </div>
            <p className="w-[13%] text-md capitalize text-[#000]">
              Complaint Type
            </p>
            <p className="w-[13%] text-md capitalize text-[#000]">
              filed against
            </p>
            <p className="w-[13%] text-md capitalize text-[#000]">witness</p>
            <p className="w-[13%] text-md capitalize text-[#000]">status</p>
            <p className="w-[13%] text-md capitalize text-[#000]">stage</p>
            <p className="w-[13%] text-md capitalize text-[#000]">decision</p>
            <div className="w-[6%]" />
          </div>
          <div className="flex flex-col">
            {loading ? (
              <Spinner loading={loading} size={50} />
            ) : complaints.length === 0 ? (
              <p className="text-center text-[#878787] py-8">
                No complaints filed yet.
              </p>
            ) : (
              complaints.map((item) => (
                <ComplaintRow
                  key={item.id}
                  item={item}
                  checked={selectedIds.includes(item.id)}
                  onCheck={() => toggleSelect(item.id)}
                  isMenuOpen={openMenuId === item.id}
                  onMenuClick={() =>
                    setOpenMenuId((prev) => (prev === item.id ? null : item.id))
                  }
                  onDelete={() => handleDelete(item.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HrHomepage;
