import React from "react";
import {
  MdDashboard,  
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { BsBuildings } from "react-icons/bs";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import { IoAccessibility } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";



const linkData = [
  {
    label: "الرئيسيه",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "المهام",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "للبدأ",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "جاري العمل",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "المكتمله",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "العقارات",
    link: "buldings",
    icon:<BsBuildings/>
  },
  {
    label: "عملاء محتملين",
    link: "customars",
    icon: <ImUsers />,
  },
  {
    label: "عملاء حاليين",
    link: "clients",
    icon: <IoAccessibility />,
  }, 
  {
    label: "الرسائل و الاعلانات",
    link: "messages",
    icon: <FaRegMessage  />,
  }, 
  {
    label: "الفريق",
    link: "team",    
    icon:<FaUsers />,
  },
  {
    label: "المحذوفات",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center hover:text-white text-white text-base  hover:bg-gold-light",
          path === el.link.split("/")[0] ? "bg-gold-dark text-[#000000]" : ""
        )}
      >
        {el.icon}
        <span className=''>{el.label}</span>
      </Link>
    );
  };
  return (
    <div className='w-full  h-max-content flex flex-col gap-0 px-5 py-1 min-h-screen bg-black'>
      <h1 className='flex gap-4 items-center'>      
        <img className='text-2xl font-bold text-gold-dark w-16 object-cover h-16' src='/logo.png' alt='logo'/>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className='pt-0'>
        <button className='w-full flex gap-2 px-2 items-center text-lg text-gold-light'>
          <MdSettings />
          <span>الأعدادات</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
