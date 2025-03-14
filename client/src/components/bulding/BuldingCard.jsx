import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
    MdKeyboardArrowUp,
} from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import {  formatDate } from "../../utils";
import { FaList, FaPhone,FaFileImage  } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from ".././task/AddSubTask";
import BuldingDialog from "./BuldingDialog";


const BuldingCard = ({ bulding }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='w-full h-fit bg-black/50 shadow-md p-4 rounded-xl ' key={bulding?._id}>
        <div className='w-full flex justify-between'>
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium text-white"              
            )}
          >
            <span className='text-lg text-gold-dark'> <MdKeyboardArrowUp /></span>
            <span className='uppercase text-lg'>صك رقم</span>
                      <span className='uppercase text-xl text-gold-light'>{ bulding.documnetNum}</span>
          </div>                            
                  <BuldingDialog bulding={bulding} />
        </div>

              <>
                  {/* //client data  */}
                  {bulding.client && bulding.client.map((item) => (
          <div className='flex items-center gap-4 justify-between text-white mt-1'>
            <div
              className={clsx("w-4 h-4 rounded-full bg-red-500")}
            />
            <h4 className='line-clamp-1 text-white'>{item.name}</h4>
            <h6 className='line-clamp-1 text-white flex gap-2 items-center'> <FaPhone color="gray"/>{item.phone}</h6>
          </div>
                  ))
                  }
              {/* location  */}
               <div className='flex items-center gap-4 justify-between text-white mt-2'>
            <span className="text-gray-300">الموقع:</span>
            <h4 className='line-clamp-1 text-white'>{bulding.district}</h4>
            <h6 className='line-clamp-1 text-white flex gap-2 items-center'> <IoLocationSharp  color="gray"/>{bulding.city}</h6>
          </div>
          <span className='text-sm text-gray-400'>
            {formatDate(new Date(bulding?.createdAt))}
          </span>
        </>
        <div className='w-full border-t border-gray-200 my-2' />
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-4'>
            <div className='flex gap-1 items-center text-sm text-gray-500'>
              <span className="text-gray-300">{bulding?.assets?.length}</span>
              <FaFileImage  />
            </div>
            <div className='flex gap-1 items-center text-sm text-gray-500 '>
              <span className="text-gray-300">{bulding?.priceOffer?.length}</span>
              <MdAttachFile />
            </div>
            <div className='flex gap-2 items-center text-sm text-gray-500 '>
              <span className="text-gray-300">{bulding?.activities?.length}</span>
              <FaList />
            </div>
          </div>         
        </div>

        {/* sub tasks */}
        {bulding?.subTasks?.length > 0 ? (
          <div className='py-4 border-t border-gray-200'>
            <h5 className='text-base line-clamp-2 text-white'>
              {bulding?.subTasks[0].title}
            </h5>
            <div className='p-4 space-x-8'>             
              <span className='bg-gold-dark px-3 py-1 rounded-full text-black font-medium'>
                {bulding?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className='py-4 border-t border-gray-200'>
              <span className='text-gray-100'>لا يوجد تعليقات</span>
            </div>
          </>
        )}

        <div className='w-full pb-2'>
          <button
            onClick={() => setOpen(true)}            
            className='w-full flex gap-4 items-center text-sm text-gray-400 font-semibold disabled:cursor-not-allowed disabled::text-gray-300'
          >
            <IoMdAdd className='text-lg' />
            <span>أضف تعليق</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={bulding._id} url='bulding'/>
    </>
  );
};

export default BuldingCard;
