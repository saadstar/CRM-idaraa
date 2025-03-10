import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import CheckBox from "./CheckBox";
import { toast } from "sonner";
import { useRegisterMutation ,useUpdateTeamMutation} from "../redux/slices/index";


const AddUser = ({ open, setOpen, userData,setUserData }) => {
  let defaultValues = userData ?? {};
  const [registerAuth, { isLoading, error }] = useRegisterMutation();
  const [updateTeam,{isLoading:updateLoading}]=useUpdateTeamMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = async (data) => {    
    try {
    if (userData) {
    await updateTeam(data);
    toast.success("تم تعديل الملف الشخصي");
  } else {
    await registerAuth(data).unwrap();
    toast.success("تمت الاضافه الموظف بنجاح!");
  }    
      setOpen(false);
      setUserData(null);
    } catch (err) {
      console.log(err);      
    }
  };
  error && toast.error(error?.data?.message);

  const cancelhandler = () => {
    setOpen(false);
    setUserData(null);
  }
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4 text-center'
          >
            {userData ? "تعديل بيانات الموظف" : "إضافه موظف جديد"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='الاسم الكامل'
              type='text'
              name='name'
              label='الاسم الكامل'
              className='w-full rounded'
              register={register("name", {
                required: ' الاسم الكامل مطلوب',
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='الاسم الثاني'
              type='text'
              name='title'
              label='الاسم الثاني'
              className='w-full rounded'
              register={register("title", {
                required: 'الاسم الثاني مطلوب!',
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="البريد الإلكتروني"
              type='email'
              name='email'
              label="البريد الإلكتروني"
              className='w-full rounded'
              register={register("email", {
                required: "البريد الإلكتروني مطلوب!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder="الوظيفه"
              type='text'
              name='role'
              label="الوظيفه"
              className='w-full rounded'
              register={register("role", {
                required: "الوظيفه مطلوبه!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
         {!userData &&   <Textbox
              type='password'
              name='password'
              label="كلمه المرور"
              className='w-full rounded'
              register={register("password", {
                required: "كلمه المرور مطلوبه!",
              })}
              error={errors.password ? errors.password.message : ""}
            />}
             <CheckBox
                label='أدمن'
                name='isAdmin'
                register={register}
                error={errors.isAdmin ? errors.isAdmin.message : ""}
              />
          </div>

          {isLoading || updateLoading ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse align-center justify-center'>
              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 hover:text-red-800 sm:w-auto'
                onClick={cancelhandler}
                label='إلغاء'
              />
              <Button
                type='submit'
                className='bg-gold-dark px-8 text-sm font-semibold text-black hover:bg-gold-light  sm:w-auto'
                label={userData ? "تعديل" : "إضافه"}
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
