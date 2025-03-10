import React from 'react'
import { useForm } from 'react-hook-form'
import { useChangePasswordMutation } from '../redux/slices';
import { toast } from 'sonner';
import ModalWrapper from './ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from './Textbox';
import Loading from './Loader';
import Button from './Button';

export const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();
    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("كلمات المرور غير متطابقه ");
            return;
        }
        try {
            const res = await changeUserPassword(data).unwrap();
            toast.success("تم تغير كلمه المرور بنجاح");
            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err?.error);
        }
    }
  return (
      <>
          <ModalWrapper open={open} setOpen={setOpen}>
              <form onSubmit={handleSubmit(handleOnSubmit)} className='text-right'>
                  <Dialog.Title as='h2'
                  className='text-base text-right font-bold leading-6 text-gray-900 mb-4'
                  >
                      تغير كلمه المرور
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-6">
                      <Textbox
                          placeholder='كلمه المرور الجديده'
                          label='كلمه المرور الجديده'
                          type='password'
                          name='password'                        
                          className='w-full rounded'
                          register={register("password", {
    required:"كلمه المرور الجديده مطلوبه"
                          })}
error={errors.password ? errors.password.message :" "}
                      />
                      <Textbox
                          placeholder='تأكيد كلمه المرور '
                          label='تأكيد كلمه المرور '
                          type='password'
                          name='cpass'                        
                          className='w-full rounded'
                          register={register("cpass", {
    required:"كلمه المرور  مطلوبه"
                          })}
error={errors.cpass ? errors.cpass.message :" "}
                      />
                  </div>
                  {isLoading ? (
                      <div className='py-5'>
                          <Loading/>
                      </div>
                  ): (
<div className='py-3 mt-4  sm:flex sm:flex-row justify-center'>
                              <Button
                                  type='submit'
                                  className='bg-gold-dark px-8 text-semibold text-black sm:w-auto hover:bg-gold-light'
                                  label='حفظ'
                              />
                              <button type=''
                                  className='bg-white px-5 text-sm hover:text-red-400 font-semibold text-gray-900 sm:w-auto'
                                  onClick={()=>setOpen(false)}
                              >
                                  إلغاء
                              </button>
                          </div>
                  )}
              </form>
      </ModalWrapper>
      </>
  )
}
