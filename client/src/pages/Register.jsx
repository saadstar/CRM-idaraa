import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/userSlice";
import Loading from "../components/Loader";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerAuth,{isLoading,error}] = useRegisterMutation();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      await registerAuth(data).unwrap();
      navigate("/log-in")
    } catch (err) {
     
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-black'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-100'>
              املي الخانات كلها!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-gold-dark'>
              <span>أنشأ</span>
              <span>حساب جديد</span>
            </p>

            <div className='cell pt-1 bg-gold-light'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-gold-dark text-3xl font-bold text-center'>
               مرحبا بك !
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='الأسم الأول'
                type='text'
                name='name'
                label='الأسم الأول'
                className='w-full rounded-full'
                register={register("name", {
                  required: " الاسم مطلوب!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='الأسم الأخير'
                type='text'
                name='title'
                label='الأسم الأخير'
                className='w-full rounded-full'
                register={register("title", {
                  required:  " الاسم مطلوب!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='محاسب ...'
                type='text'
                name='role'
                label='الوظيفه'
                className='w-full rounded-full'
                register={register("role", {
                  required: "الوظيفه مطلوبه!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='البريد الالكتروني'
                className='w-full rounded-full'
                register={register("email", {
                  required: "البريد الالكتروني مطلوب!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='كلمه المرور'
                className='w-full rounded-full'
                register={register("password", {
                  required:"كلمه المرور مطلوبه!",
                })}
                error={errors.password ? errors.password.message : ""}
              />             
              <Link to='/log-in'>
              <span className='text-sm text-gray-500 hover:text-gold-dark hover:underline cursor-pointer'>
               لديك حساب بالفعل؟
                </span>
                </Link>
               <span className='text-sm text-red-500 w-full'>{error && error?.data?.message}</span>

             {isLoading ? <Loading/>: <Button
                type='submit'
                label='إنشاء حساب'
                className='w-full h-10 bg-gold-dark hover:bg-gold-light text-white rounded-full'
              />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
