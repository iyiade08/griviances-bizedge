import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SelectWitnessModal from "./SelectWitnessModal";

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
          {selectedWitness ? selectedWitness.name : "Select witness"}
        </span>
        <ChevronDown className="w-4 h-4 text-[#878787]" />
      </button>

      <SelectWitnessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(employee) => setSelectedWitness(employee)}
      />
    </div>
  );
};

export default SelectWitness;
