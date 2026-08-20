import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SelectPersonModal from "./SelectPersonalModal";

const SelectWitness = ({ selectedWitness, setSelectedWitness }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-1">
      <p className="text-base font-semibold">Select Witness (Optional)</p>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-between border border-[#E1E1E1] rounded-md px-4 py-3 text-left"
      >
        <span className={selectedWitness ? "text-[#000]" : "text-[#878787]"}>
          {selectedWitness ? selectedWitness.full_name : "Select witness"}
        </span>
        <ChevronDown className="w-4 h-4 text-[#878787]" />
      </button>

      <SelectPersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(employee) => setSelectedWitness(employee)}
        title="Select Witness"
      />
    </div>
  );
};

export default SelectWitness;
