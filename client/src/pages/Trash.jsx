import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { tasks } from "../assets/data";
import Title from "../components/Title";
import Button from "../components/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import AddUser from "../components/AddUser";
import ConfirmatioDialog from "../components/Dialogs";
import { useDeleteRestoreTaskMutation, useGetAllTasksQuery } from "../redux/slices";
import Loading from "../components/Loader";
import { toast } from "sonner";
import ImgLoader from "../components/ImgLoader";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");
  const { data ,isLoading} = useGetAllTasksQuery({
    strQuery: "",
    isTrashed: "true",
    search:""
  })
  const[ deleteRestoreTask]=useDeleteRestoreTaskMutation()
  if (isLoading) {
    return (
      <div className='py-10'>
        <ImgLoader/>
      </div>
    )
  };
  const deleteRestoreHandler = async () => {
    try {
      let result;
      switch (type) {
        case ("delete"):
          result = await deleteRestoreTask({
            id: selected,
            actionType: "delete"
          }).unwrap();
          break;
        case ("deleteAll"):
          result = await deleteRestoreTask({
            id: selected,
            actionType: "deleteAll"
          }).unwrap();
          break;
        case ("restore"):
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restore"
          }).unwrap();
          break;
        case ("restoreAll"):
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restoreAll"
          }).unwrap();
          break;      
      }
      toast.success(result?.message);
      setOpenDialog(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("هل تريد حذف كل العناصر؟");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("هل تريد استعاده جميع العناصر؟");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("هل تريد استعاده هذا العنصر؟");
    setOpenDialog(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 text-right'>
      <tr className='text-black  text-right'>
        <th className='py-2'>المهمه</th>
        <th className='py-2'>الأولويه</th>
        <th className='py-2'>المرحله</th>
        <th className='py-2 line-clamp-1'>تاريخ الحذف</th>
        <th className='py-2'>تعديل </th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10 text-right'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-black'>
            {item?.title}
          </p>
        </div>
      </td>

      <td className='py-2 capitalize'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className=''>{item?.priority}</span>
        </div>
      </td>

      <td className='py-2 capitalize text-center md:text-start'>
        {item?.stage}
      </td>
      <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

      <td className='py-2 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8 text-white'>
          <Title title='المحذوفات مؤخراً' />

          <div className='flex gap-2 md:gap-4 items-center'>
            <Button
              label='إستعاده الكل'
              icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center  text-gold-light text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={() => restoreAllClick()}
            />
            <Button
              label='حذف الكل'
              icon={<MdDelete className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>
        <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {data?.tasks?.map((tk, id) => (
                  <TableRow key={id} item={tk} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};

export default Trash;
