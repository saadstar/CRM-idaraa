import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices";
import { toast } from "sonner";

const AddSubTask = ({ open, setOpen, id ,url}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addSbTask] = useCreateSubTaskMutation();
  
  const handleOnSubmit = async (data) => {    
    try {
      const res = await addSbTask({url, data, id }).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4 text-center'
          >
            أضف تعليق
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='وصف التعليق'
              type='text'
              name='title'
              label='التعليق'
              className='w-full rounded'
              register={register("title", {
                required: "الحقل مطلوب",
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className='flex items-center gap-4'>
             {url === 'task' &&( <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='التاريخ'
                className='w-full rounded'
                register={register("date", {
                   required: "الحقل مطلوب",
                })}
                error={errors.date ? errors.date.message : ""}
              />)}
              <Textbox
                placeholder='كلمه مفتاحيه'
                type='text'
                name='tag'
                label='كلمه مفتاحيه'
                className='w-full rounded  text-sm sm:text-lg'
                register={register("tag", {
                required: "الحقل مطلوب",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className='py-3 mt-4 flex sm:flex-row gap-4'>
            <Button
              type='submit'
              className='bg-gold-dark text-sm font-semibold text-white hover:bg-gold-light sm:mr-3 sm:w-auto'
              label='إضافه'
            />

            <Button
              type='button'
              className='bg-white border text-sm font-semibold hover:text-red-400 text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='إلغاء'
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddSubTask;
