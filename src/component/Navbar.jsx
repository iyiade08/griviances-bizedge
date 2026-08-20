import logo from "../assets/Navbaricon/bizedge-logo.png";
import bars from "../assets/Navbaricon/bars-icon.png";
import home from "../assets/Navbaricon/home-icon.png";
import notification from "../assets/Navbaricon/notification-icon.png";
import info from "../assets/Navbaricon/info-icon.png";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const navbarLinks = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "people",
      path: "/people",
    },
    {
      name: "timeoff",
      path: "/timeoff",
    },
    {
      name: "benefits",
      path: "/benefits",
    },
    {
      name: "documents",
      path: "/documents",
    },
    {
      name: "payslips",
      path: "/payslips",
    },
    {
      name: "performance review",
      path: "/performance-review",
    },
    {
      name: "complaints",
      path: "/submittedcomplaint",
    },
    {
      name: "assets",
      path: "/assets",
    },
    {
      name: "tasks",
      path: "/tasks",
    },
  ];

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-normal font-semibold text-xl capitalize bg-[#EAF8FA] text-[#2898A4] border-b-2 border-b-[#2898A4] p-3 rounded-t-xl"
      : "text-[#878787] font-normal font-semibold text-xl capitalize p-[10px]";

  return (
    <div className=" flex flex-col fixed top-0 left-0  right-0 z-50 gap-4  mx-6 bg-[#fff]">
      {/* logo part */}
      <div className="flex justify-between items-center shadow-sm pb-3 px-3  mx-10">
        <div className="">
          <img src={logo} alt="bizedge" />
        </div>
        <div className="flex items-center   ">
          <div className="flex gap-12">
            <Link to="#">
              <img src={home} alt="home-icon" className="text-[#A8A8A8]" />
            </Link>
            <Link to="#">
              <img src={bars} alt="home-icon" className="text-[#A8A8A8]" />
            </Link>
            <Link to="#">
              <img src={info} alt="home-icon" className="text-[#A8A8A8]" />
            </Link>
            <Link to="#" className="pr-6">
              <img
                src={notification}
                alt="home-icon"
                className="text-[#A8A8A8]"
              />
            </Link>
          </div>
          <div className="flex items-center border-l border-l-[#E1E1E1] pl-6">
            <Link to="#">
              <span className="w-12 h-12 rounded-lg bg-[#FDEDCE] flex items-center justify-center font-semibold text-[#B8860B]">
                W
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* second part of the navbar */}
      <div className="flex justify-between items-center  w-[85%] mx-auto">
        {navbarLinks.map((link) => (
          <NavLink key={link.name} to={link.path} className={linkClass}>
            <span className="text-xl capitalize">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
