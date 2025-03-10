import { Popover, Transition } from "@headlessui/react";
import moment from "moment";  
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNotificationQuery,useMarkNotiAsReadMutation } from "../redux/slices/userSlice";
import ViewNotification from "./ViewNotification";


const ICONS = {
  alert: (
    <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
  message: (
    <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
};

const NotificationPanel = () => {  
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { data } = useNotificationQuery();
   const [markAsRead] = useMarkNotiAsReadMutation();

  const readHandler =async (type, id) => {
    await markAsRead({ type, id }).unwrap();
  };
  const viewHandler = async (el) => {
    setSelected(el);    
    readHandler("one", el._id);
    setOpen(true);
  };

  const callsToAction = [
    {
      name: "تعين الجميع كمقرؤء",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", ""),
    },
    { name: "إلغاء", href: "#", icon: "" },
  ];

  return (
    <>
      <Popover className='relative'>
        <Popover.Button className='inline-flex items-center outline-none'>
          <div className='w-10 h-10 flex items-center justify-center text-white relative'>
            <IoIosNotificationsOutline className='text-2xl' />
            {data?.length > 0 ? (
              <span className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
                {data?.length}
              </span>
            ) : (
                <span className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
             0
              </span>
            )
          }
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute -left-16 md:-left-2 z-10 mt-5 flex w-screen max-w-max  px-4'>
            {({ close }) =>
              data?.length > 0 && (
                <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                  <div className='p-4'>
                    {data?.slice(0, 8).map((item, index) => (
                      <div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
                      >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                          {ICONS[item.notiType]}
                        </div>

                        <div
                          className='cursor-pointer'
                          onClick={() => viewHandler(item)}
                        >
                          <div className='flex items-center gap-3 font-semibold text-gold-dark capitalize'>
                            <p> {item.notiType}</p>
                            <span className='text-xs font-normal lowercase'>
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className='line-clamp-1 mt-1 text-gray-600'>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='grid grid-cols-2 divide-x bg-gray-50'>
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        onClick={
                          item?.onClick ? () => item.onClick() : () => close()
                        }
                        className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
          </Popover.Panel>
        </Transition>
      </Popover>
      <ViewNotification open={open} setOpen={setOpen} el={selected}/>
     </>
  );
};

export default NotificationPanel;
