import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "../Dialogs";
import { useDuplicateTaskMutation,useTrashTaskMutation } from "../../redux/slices";
import { toast } from "sonner";

const TaskDialog = ({ task ,isAdmin}) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [trashTask] = useTrashTaskMutation();
  const [duplicateTask] = useDuplicateTaskMutation();
  const navigate = useNavigate();

  const duplicateHandler =async () => {
      try {
      const res = await duplicateTask({
        id: task._id,        
      }).unwrap();
      toast.success(res?.message);
      
    } catch (err) {
      toast.warning(err.data?.message || err.error);
    }
   };
  
  const deleteClicks = () => {
    setOpenDialog(true);
  };
  const deleteHandler = async () => {
    try {
      const res = await trashTask({
        id: task._id,
        isTrashed:"trash"
      }).unwrap();
      toast.success(res?.message);
      setOpenDialog(false);
    } catch (err) {
      toast.warning(err.data?.message || err.error);
    }
  };

  const items = [
    {
      label: "عرض المهمه",
      icon: <AiTwotoneFolderOpen className='ml-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "تعديل",
      icon: <MdOutlineEdit className='ml-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "أضافه تعليق",
      icon: <MdAdd className='ml-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpen(true),
    },
      ...(isAdmin ? [{
    label: "طبع نسخه اخري",
    icon: <HiDuplicate className='ml-2 h-5 w-5' aria-hidden='true' />,
    onClick: () => duplicateHandler(),
  }] : [])
  ];
  
  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white  '>
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute p-4 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
              <div className='px-1 py-1 space-y-2'>
                { items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active ? "bg-gold-dark text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

          {isAdmin &&    <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${
                        active ? "bg-gold-dark text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiDeleteBin6Line
                        className='ml-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                      حذف
                    </button>
                  )}
                </Menu.Item>
              </div>}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime()}
      />

      <AddSubTask open={open} setOpen={setOpen} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default TaskDialog;
