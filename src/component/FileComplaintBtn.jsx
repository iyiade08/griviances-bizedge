import { useNavigate } from "react-router-dom";

const FileComplaintBtn = () => {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/complaint")}>
      <p className="text-[#fff] py-3 px-10 rounded-lg bg-[#2898A4] capitalize text-center">
        file a complaint
      </p>
    </button>
  );
};

export default FileComplaintBtn;
