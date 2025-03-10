import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices";
import { toast } from "sonner";
import FileInput from "../FileInput";

const AddPriceOffer = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const validatePDF = (fileList) => {
    const fileType = fileList[0]?.type;
    return fileType === 'application/pdf' || 'Only PDF files are allowed';
  };
    const handleOnSubmit = async (data) => {    
    console.log(data)  
    // try {
    // //   toast.success(res.message);
    //   setTimeout(() => {
    //     setOpen(false);
    //   }, 500);
    // } catch (err) {
    //   console.log(err);
    //   toast.error(err?.data?.message || err.error);
    // }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4 text-center'
          >
            أضف عرض اسعار
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>                                
        <FileInput
                          label="عرض اسعار" 
        name='priceOffer'                 
                           register={register("priceOffer", {
                               required: "الحقل مطلوب",
                               validate:validatePDF
              })}
              error={errors.priceOffer ? errors.priceOffer.message : ""}        
      />
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

export default AddPriceOffer;
