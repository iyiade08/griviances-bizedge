import FileComplaintBtn from "../../component/FileComplaintBtn";

const HrComplaintPage = () => {
  return (
    <div className="mt-40 flex flex-col items-center justify-center genLayout">
      <p className="text-[#A8A8A8] font-sans text-xl capitalize font-semibold">
        you have no complaints record yet
      </p>
      <FileComplaintBtn />
    </div>
  );
};

export default HrComplaintPage;
