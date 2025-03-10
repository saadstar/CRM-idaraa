import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import { useDeleteTeamMutation, useGetTeamQuery, useUpdateTeamMutation } from "../redux/slices/userSlice";
import Loading from "../components/Loader";
import { toast } from "sonner";

const Users = () => {
  const {data,isLoading,error}=useGetTeamQuery();
  const [deleteTeam,{isLoading:deleteLoading}]=useDeleteTeamMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);  
  const userActionHandler = async () => {
    try {
      // const res = await updateTeam({ selected?._id, selected });
      // consolo.log(res);
      // setSelected(null);
      // setOpenAction(false);
      // toast.success(res?.data?.message, { duration: 3000 });
    }
    catch (err) {
      toast.error(err, { duration: 3000 });      
    }
   };
  
  const deleteHandler = async () => {
     try {      
      const res = await deleteTeam(selected).unwrap();
      setSelected(null);
       setOpenDialog(false);
       toast.success(res.message, { duration: 3000 });
    }
    catch (err) {
      toast.error(err, { duration: 3000 });      
    }
  };
  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-right'>
        <th className='py-2'>الاسم الكامل</th>
        <th className='py-2'>الثاني</th>
        <th className='py-2'>الوظيفه</th>
        <th className='py-2'>الحاله</th>
        <th className='py-2'>البريد</th>
        <th className='py-2'>التعديلات </th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>     
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title}</td>      
      <td className='p-2'>{user.role}</td>

      <td>
        <button          
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isAdmin ? "bg-gold-dark text-white" : "bg-red-100"
          )}
        >
          {user?.isAdmin ? "أدمن" : "موظف"}
        </button>
      </td>
          <td className='p-2'>{user.email || "user.emal.com"}</td>
      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='تعديل'
          type='button'
          onClick={() => editClick(user)}
        />
        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='حذف'
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );
  
  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8 text-white'>
          <Title title='الموظفين' />
          <Button
            label='أضافه موظف'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-gold-dark hover:bg-gold-light text-white rounded-md 2xl:py-2.5'
            onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
            {isLoading ? <div className="relative h-[60vh]"><div className="absolute top-[50%] left-[-100%]"> <Loading/></div></div>:  <tbody>
                {data?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>}
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        setUserData={setSelected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
