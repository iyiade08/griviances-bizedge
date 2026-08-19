import healthicon from "../../assets/Benefitsicons/healthicon.png";
import pensionicon from "../../assets/Benefitsicons/pensionicon.png";
import websiteicon from "../../assets/Benefitsicons/websiteicon.png";
import { Globe } from "lucide-react";

const BenefitCard = ({ className }) => {
  const benefitCards = [
    {
      id: 1,
      name: "Family Healthcare Plan",
      company: "Leadway & Associates",
      dependents: "3 Dependents",
      avatar: healthicon,
      avatarBgColor: "#C8D7FF",
      visitWebsiteBg: "#EBEFFA",
      visitWebsiteTextColor: "#4069D0",
      websiteicon: websiteicon,
    },
    {
      id: 2,
      name: "Leadway Pension",
      company: "Leadway & Associates",
      dependents: "1 Dependent",
      avatar: pensionicon,
      avatarBgColor: "#FFE7E7",
      visitWebsiteBg: "#FFF1F1",
      visitWebsiteTextColor: "#FF7372",
      websiteicon: websiteicon,
    },
  ];

  return (
    <div
      className={`flex flex-col bg-[#fff] shadow-lg rounded-lg p-4 space-y-3 ${className}`}
    >
      <p className="text-[#000] capitalize font-bold text-xl">benefits</p>

      <div className="grid grid-cols-2 gap-4">
        {benefitCards.map((benefitCard) => (
          <div
            key={benefitCard.id}
            className="bg-[#fff] rounded-lg border border-gray-200 flex flex-col gap-3 p-3"
          >
            <div className="flex gap-2 justify-center items-start">
              <div
                className="w-10 h-10 shrink-0 flex items-center justify-center  rounded-lg"
                style={{ backgroundColor: benefitCard.avatarBgColor }}
              >
                <img src={benefitCard.avatar} className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-bold text-sm text-[#000]">
                  {benefitCard.name}
                </p>
                <p className="text-xs text-[#878787]">{benefitCard.company}</p>
                <p className="text-xs text-[#878787]">
                  {benefitCard.dependents}
                </p>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 py-2 rounded-md">
              <Globe
                className="w-4 h-4"
                style={{ color: benefitCard.visitWebsiteTextColor }}
              />
              <p
                className="text-sm font-medium"
                style={{ color: benefitCard.visitWebsiteTextColor }}
              >
                Visit Website
              </p>
            </button>

            <button className="text-sm text-[#000] border border-[#E1E1E1] py-2 rounded-md hover:bg-gray-50 transition-colors">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitCard;
