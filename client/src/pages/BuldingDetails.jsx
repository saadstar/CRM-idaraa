import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Tabs from "../components/Tabs";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials, singleBulding } from "../utils";
import Loading from "../components/Loader";
import Button from "../components/Button";
import { useGetSingleTaskQuery, usePostTaskActivityMutation } from "../redux/slices/taskSlice";
import ImgLoader from "../components/ImgLoader";

const defaultAssets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];



const TABS = [
  { title: "تفاصيل العقار", icon: <FaTasks /> },
  { title: "التحركات/النشاطات", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
    "هغغ": (
    <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "البدأ",
  "معاينه",
  "عرض اسعار",
  "تعليق",
  "مشكله",
  "تم الانتهاء",
];

const BuldingDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleTaskQuery(id);
    const isLoading = false;
  const [selected, setSelected] = useState(0);
    //   const bulding = data?.bulding;
    const bulding = singleBulding;
  if (isLoading) {
    return (
      <div className="py-10 flex justify-center min-h-screen">
        <ImgLoader/>
      </div>
    )
  }
  return (
    <div className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden'>
      <h1 className='text-2xl text-gray-100 font-bold'>{bulding?.title}</h1>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto'>
              {/* LEFT */}
              <div className='w-full md:w-1/2 space-y-8'>
                <div className='flex items-center gap-5'>
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base bg-yellow-200 font-semibold text-black px-3 py-1 rounded-full",                                            
                    )}
                  >
                    <span className='text-lg text-gold-dark'><MdKeyboardDoubleArrowUp /></span>
                    <span className='text-lg'>صك رقم</span>
                                      <span className='uppercase'>{ bulding?.documnetNum}</span>
                  </div>

                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full bg-green-200"                        
                      )}
                    />
                                      <span className='text-black uppercase text-right'>{bulding?.client[0]?.name}</span>
                                      
                  </div>
                </div>

                <p className='text-gray-500 text-right'>
                   أٌنشاء: {new Date(bulding?.createdAt).toDateString()}
                </p>

                <div className='flex items-center gap-8 p-4 border-y border-gray-200'>
                  <div className='space-x-2'>
                    <span className='font-semibold'>صور العقار و الصك :</span>
                    <span>{bulding?.assets?.length}</span>
                  </div>

                  <span className='text-gray-400'>|</span>

                  <div className='space-x-2'>
                    <span className='font-semibold'>التعليقات :</span>
                    <span>{bulding?.subTasks?.length}</span>
                  </div>
                </div>

                <div className='space-y-4 py-6'>
                  <p className='text-gray-600 font-semibold test-sm'>
                    التفاصيل
                  </p>
                  <div className='space-y-3' key={bulding?._id}>                    
                      <div                        
                        className='flex justify-between py-2 items-center border-t border-gray-200'
                      >                        
                        <div>
                          <p className='text-lg font-semibold'>{"رقم الهويه العقاريه"}</p>
                          <span className='text-gray-500'>{bulding?.identityId}</span>
                        </div>
                        <div>
                          <p className='text-lg font-semibold'>{"نوع العقار"}</p>
                          <span className='text-gray-500'>{bulding?.type}</span>
                        </div>
                        <div>
                          <p className='text-lg font-semibold'>{"نوع الاستخدام"}</p>
                          <span className='text-gray-500'>{bulding?.usageType}</span>
                        </div>
                      </div>                    
                      <div                        
                        className='flex justify-between py-2 items-center border-t border-gray-200'
                      >                        
                        <div>
                          <p className='text-lg font-semibold'>{"الموقع"}</p>
                          <span className='text-gray-500'>{bulding?.site}</span>
                        </div>
                        <div>
                          <p className='text-lg font-semibold'>{"الحي"}</p>
                          <span className='text-gray-500'>{bulding?.district}</span>
                        </div>
                        <div>
                          <p className='text-lg font-semibold'>{"المدينه"}</p>
                          <span className='text-gray-500'>{bulding?.city}</span>
                        </div>
                      </div>                    
                      <div                        
                        className='flex justify-between py-2 items-center border-t border-gray-200'
                      >                        
                        <div>
                          <p className='text-lg font-semibold'>{"رقم القطعه"}</p>
                          <span className='text-gray-500'>{bulding?.pieceNumber}</span>
                        </div>
                        <div>
                          <p className='text-lg font-semibold'>{"مساحه العقار"}</p>
                          <span className='text-gray-500'>{bulding?.size}</span>
                        </div>                      
                      </div>                    
                      <div                        
                        className='flex justify-between py-2 items-center w-full border-t border-gray-200'
                      >                        
                        <div>
                          <p className='text-lg font-semibold'>{"سبب التقييم"}</p>
                          <span className='text-gray-500 border-2 border-gray-300 rounded-md w-full px-4 mt-2'>{bulding?.reasone}</span>
                        </div>                                            
                      </div>                    
                  </div>
                </div>

                <div className='space-y-4 py-6'>
                  <p className='text-gray-500 font-semibold text-sm'>
                    التعليقات
                  </p>
                  <div className='space-y-8'>
                    {bulding?.subTasks?.map((el, index) => (
                      <div key={index} className='flex gap-3'>
                        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200'>
                          <MdTaskAlt className='text-violet-600' size={26} />
                        </div>

                        <div className='space-y-1'>
                          <div className='flex gap-2 items-center'>
                            <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                              {el?.tag}
                            </span>                         
                          </div>
                          <p className='text-gray-800 text-right'>{el?.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className='w-full md:w-1/2 space-y-8'>
                <p className='text-lg font-semibold'>الصور</p>

                <div className='w-full grid grid-cols-2 gap-4'>
                  {bulding?.assets?.map((el, index) => (
                    <img
                      key={index}
                      src={el}
                      alt={bulding?.title}
                      className='w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50'
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Activities activity={data?.bulding?.activities} id={id} />
          </>
        )}
      </Tabs>
    </div>
  );
};

const Activities = ({ activity, id }) => {
  const [postTaskActivity,{isLoading}] = usePostTaskActivityMutation();
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");


  const handleSubmit = async () => {
    try {
      const activityDate = {
        type: selected?.toLowerCase(),
        activity:text
      }
      const res = await postTaskActivity({ body: activityDate, id }).unwrap();
      setText("");
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
if (isLoading) {
    return (
      <div className="py-10">
        <Loading/>
      </div>
    )
  }
  const Card = ({ item }) => {
    return (
      <div className='flex space-x-4 text-right'>
        <div className='flex flex-col items-center flex-shrink-0'>
          <div className='w-10 h-10 flex items-center justify-center ml-2'>
            {TASKTYPEICON[item?.type]}
          </div>
          <div className='w-full flex items-center'>
            <div className='w-0.5 bg-gray-300 h-full'></div>
          </div>
        </div>

        <div className='flex flex-col gap-y-1 mb-8'>
          <p className='font-semibold'>{item?.by?.name}</p>
          <div className='text-gray-500 space-y-2'>
            <span className='capitalize'>{item?.type}</span>
            <span className='text-sm mr-4'>{moment(item?.date).fromNow()}</span>
          </div>
          <div className='text-gray-700'>{item?.activity}</div>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
      <div className='w-full md:w-1/2'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>التحركات و النشاطات</h4>

        <div className='w-full'>
          {activity?.map((el, index) => (
            <Card
              key={index}
              item={el}
              isConnected={index < activity.length - 1}
            />
          ))}
        </div>
      </div>

      <div className='w-full md:w-1/3'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>
          إضافه تحرك
        </h4>
        <div className='w-full flex flex-wrap gap-5'>
          {act_types.map((item, index) => (
            <div key={index} className='flex gap-2 items-center'>
              <input
                type='checkbox'
                className='w-4 h-4 '
                checked={selected === item ? true : false}
                onChange={(e) => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='ملاحظات'
            className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type='button'
              label='حفظ'
              onClick={handleSubmit}
              className='bg-gold-dark text-gray-900 w-full rounded hover:bg-gold-light'
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default BuldingDetails;