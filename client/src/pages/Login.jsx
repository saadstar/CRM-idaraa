import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { provider, auth } from "../firebase";
import { signInWithPopup } from 'firebase/auth';
import { useLoginMutation } from "../redux/slices/userSlice";
import Loading from "../components/Loader";
import { toast } from "sonner";

const Login = () => {
  const { user } = useSelector((state) => state.auth);  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    try {
      const res = await login(data);      
     res?.data?.success &&  dispatch(setCredentials(res?.data?.user));
       toast.success("مرحبا!");
       navigate("/dashboard");
    !res.error?.data?.status &&   toast.warning(res.error?.data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider).then((result) => {        
      axios.post(`${URL}/google`, {
        name:result.user.displayName,
        email: result.user.email,      
        title:result.user.displayName,
        role: "موظف",
        isAdmin:false,
        isActive: true,
      }).then((res) => {
        dispatch(setCredentials(res.data));
        navigate("/dashboard");
      })
    })
  }
  
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
              تحكم في كل عقاراتك من مكان واحد! 
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-gold-dark'>
              <span>إداره</span>
              <span>للتقييم العقاري</span>
            </p>

            <div className='sm:cell bg-gold-dark pt-1 visible sm:block hidden'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>         
        <div className="flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14 form-container relative w-full md:w-[400px]">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className=' '
          >
            <div className=''>
              <p className='text-gold-dark text-3xl font-bold text-center'>
               مرحبا بعودتك !
              </p>
              <p className='text-center text-base text-gray-700 '>
                حافط علي بياناتك .
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
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
                placeholder='المرور'
                type='password'
                name='password'
                label='كلمه المرور'
                className='w-full rounded-full'
                register={register("password", {
                  required:"كلمه المرور مطلوبه!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

           <Link to='/sign-up'>   <span className='text-sm text-gray-500 hover:text-gold-light hover:underline cursor-pointer'>
               ليس لديك حساب؟
              </span>
                </Link>
               <span className='text-sm text-red-500 w-full'>{error&& error?.data?.message}</span>

              {isLoading ? <Loading/>: <Button
                type='submit'
                label='تسجيل الدخول'
                className='w-full h-10 bg-gold-dark text-white rounded-lg hover:bg-gold-light focus:outline-none '
              />}
            </div>
            <hr/>
          </form>
          {/* google button   */}
          <button
            className="flex justify-center items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={signInWithGoogle}
          >
          <svg className="h-6 w-6 flex items-center " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with saad.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
          <span className="mr-2">تسجيل الدخول مع جوجل</span>
            </button>
            </div>  
        </div>
      </div>
    </div>
  );
};

export default Login;
