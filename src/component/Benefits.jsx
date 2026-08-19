import BenefitCard from "../Features/BenefitFeatures/BenefitCard";
import MyTeam from "../Features/BenefitFeatures/MyTeam";

const Benefits = () => {
  return (
    <div className="grid grid-cols-4 p-2">
      <BenefitCard className="col-span-3" />
      <MyTeam />
    </div>
  );
};

export default Benefits;
