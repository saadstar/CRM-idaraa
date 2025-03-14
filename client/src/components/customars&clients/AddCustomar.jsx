import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import { FaArrowDown,FaArrowUp } from "react-icons/fa";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useCreateBuldingMutation,  useCreateCustomarMutation,  useUpdateBuldingMutation, useUpdateCustomarMutation } from "../../redux/slices";
import { toast } from "sonner";


const AddCustomar = ({ open, setOpen, customar }) => {   
  const defaultValues = {
    company: customar?.company || "",    
    region: customar?.region || "",
    entitySize: customar?.entitySize || "",
    sector: customar?.sector || "",
    person: customar?.person || "",
    email: customar?.email || "",
    phone: customar?.phone || "",
    notes: customar?.notes || "",
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });   
  const [createCustomar,{isLoading}] = useCreateCustomarMutation()
  const [updateCustomar, { isLoading: isUpdating }] = useUpdateCustomarMutation();
 
  const submitHandler = async (data) => {
    try {
        const res = customar?._id
        ? await updateCustomar({...data,_id:customar?._id}).unwrap()
        : await createCustomar(data).unwrap();
  
      toast.success(res.message || "تمت العملية بنجاح!");
      setTimeout(() => setOpen(false), 500);
    } catch (err) {
      console.error("خطأ أثناء الإرسال:", err);
      toast.error(err?.data?.message || "حدث خطأ غير متوقع");
    }
  };
  

  return (
    <div >
      <ModalWrapper open={open} setOpen={setOpen} >
        <form onSubmit={handleSubmit(submitHandler)} >
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4 text-center'
          >
            {customar ? "تعديل العميل" : "إضافه عميل جديد"}
          </Dialog.Title>

                  <div className='mt-2 flex flex-col gap-6'>
            <div className="flex gap-4">
            <Textbox
              placeholder='الشركه'
              type='text'
              name='company'
              label='الشركه'
              className='w-full rounded'
              register={register("company", { required: "مطلوب" })}
              error={errors.company ? errors.company.message : ""}
            />            
            <Textbox
              placeholder='المنظقه'
              type='text'
              name='region'
              label='المنظقه'
              className='w-full rounded'
              register={register("region")}
              error={errors.region ? errors.region.message : ""}
            />            
</div>
            <div className='flex gap-4'>
            <Textbox
              label='الفئه'
              type='text'
              name='entitySize'
              placeholder='A,B,C'
              className='w-full rounded'
              register={register("entitySize")}
              error={errors.entitySize ? errors.entitySize.message : ""}
            />                      
            <Textbox
              placeholder='القطاع'
              type='text'
              name='sector'
              label='القطاع'
              className='w-full rounded'
              register={register("sector")}
              error={errors.sector ? errors.sector.message : ""}
            />               
              
            </div>
            <div className='flex gap-4'>
            <Textbox
            label  ="الشخص المسئول"
              type='text'
              placeholder  ='الاسم بالكامل'
              name="person"
              className='w-full rounded'
              register={register("person")}
              error={errors.person ? errors.person.message : ""}
            />                                     
            <Textbox
              placeholder='test@gmail.com'
              type='email'
              name='email'
              label='الايميل'
              className='w-full rounded'
              register={register("email")}
              error={errors.email ? errors.email.message : ""}
            />               
            </div>                   
            <div className='flex gap-4'>
            <Textbox
             name ="phone"
              type='text'
              placeholder='الهاتف'
              label="الهاتف"
              className='w-full rounded'
              register={register("phone")}
              error={errors.phone ? errors.phone.message : ""}
            />                                     
            <Textbox
              placeholder='ملاحظات'
              type='textarea'
              name='notes'
              label='ملاحظات'
              className='w-full rounded'
              register={register("notes")}
              error={errors.notes ? errors.notes.message : ""}
            />               
            </div>                   
            <div className='text-center py-2 sm:flex items-center  sm:flex-row gap-4'>             
                <Button
                  label={customar? isUpdating?"جاري التعديل":"تعديل":
                    isLoading?"جاري ...":'تم'}
                  type='submit'
                  className='bg-gold-dark px-8 text-sm font-semibold text-white hover:bg-gold-light  sm:w-auto'
                />              

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold border-2 border-red-200 text-gray-900 transation sm:w-auto hover:bg-red-600 hover:text-gray-100'
                onClick={() => setOpen(false)}
                label='إلغاء'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default AddCustomar;
