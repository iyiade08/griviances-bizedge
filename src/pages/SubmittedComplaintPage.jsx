import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import Pagination from "../Features/SubmittedComplaints/Pagination";
import ColumnHeader from "../Features/SubmittedComplaints/ColumHeader";
import ComplaintRow from "../Features/SubmittedComplaints/ComplaintRow";
import { getComplaints, deleteComplaint } from "../utils/mockComplaints";
import Spinner from "../component/Spinner";

const SubmittedComplaint = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedIds, setSelectedIds] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const data = await getComplaints();
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
    <div className="mt-40 flex flex-col space-y-4 genLayout min-h-screen p-16">
      <div className="flex justify-between p-2">
        <p className="text-[#000000] text-2xl font-bold capitalize text-center">
          complaints
        </p>
      </div>

      <div className="flex flex-col p-2">
        <div className="w-[20vw] flex items-center justify-between px-4 h-12 mb-5 rounded-full bg-[#E1E1E1]">
          <button type="button" className="bg-[#fff] px-6 py-2 rounded-full">
            <p className="text-base capitalize">reported by you</p>
          </button>

          <button
            type="button"
            onClick={() => navigate("/submittedcomplaint/against-you")}
            className="px-6 py-2"
          >
            <p className="text-base capitalize">against you</p>
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-10">
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
            <div className="flex items-center bg-[#E1E1E1]/50 px-4 rounded-lg gap-3 border ">
              <p className="text-[#000]/50 text-base">complaint type</p>
              <button type="button">
                <FaChevronDown className="w-4 h-4 text-[#000]/50" />
              </button>
            </div>
            <div className="flex items-center bg-[#E1E1E1]/50 px-4 rounded-lg gap-4">
              <p className="text-[#000]/50 text-base">status</p>
              <button type="button">
                <FaChevronDown className="w-4 h-4 text-[#000]/50" />
              </button>
            </div>
            <div className="flex items-center bg-[#E1E1E1]/50 px-4 rounded-lg gap-4">
              <p className="text-[#000]/50 text-base">stage</p>
              <button type="button">
                <FaChevronDown className="w-4 h-4 text-[#000]/50" />
              </button>
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
  );
};

export default SubmittedComplaint;
