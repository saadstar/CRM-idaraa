import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import {setSearchValue} from "../redux/slices/searchSlice"
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {  
  const dispatch = useDispatch();
    

    const handleSearchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };
  return (
    <div className='flex justify-between items-center bg-black px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-white block md:hidden'
        >
          ☰
        </button>

        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-white hidden sm:flex'>
          <MdOutlineSearch className='text-black text-xl' />

          <input
            type='text'
            onChange={handleSearchChange}
            placeholder='ابحث هنا....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800 '
          />
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
