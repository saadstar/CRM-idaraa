import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import { FaArrowDown,FaArrowUp } from "react-icons/fa";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices";
import { toast } from "sonner";


const AddBulding = ({ open, setOpen, bulding }) => { 
  console.log("all that for seetting new bulding",bulding?.client[0]);
  const defaultValues = {
    documnetNum: bulding?.documnetNum || "",    
    identityId: bulding?.identityId || "",
    type: bulding?.type || "",
    usageType: bulding?.usageType || "",
    site: bulding?.site || "",
    district: bulding?.district || "",
    city: bulding?.city || "",
    pieceNumber: bulding?.pieceNumber || "",
    reasone: bulding?.reasone || "",
    name: bulding?.client[0]?.name || "",
    nationalId: bulding?.client[0]?.nationalId || "",
    phone: bulding?.client[0]?.phone || "",
    owingPercentage: bulding?.client[0]?.owingPercentage || "",
    size: bulding?.size || "",        
    assets:[]
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues }); 
  const [clientCollapse, setClientCollapse] = useState(false);
  const [createTask,{isLoading}] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();



  const submitHandler = async (data) => {
    console.log(data);
    try {   
      const res = bulding?._id ?
        await updateTask({...data,_id:bulding._id}).unwrap() :
        await createTask(data).unwrap();
      toast.success(res.message);        
      setTimeout(() =>{
        setOpen(false);
      },500)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
            {bulding ? "تعديل العقار" : "إضافه عقار جديد"}
          </Dialog.Title>

                  <div className='mt-2 flex flex-col gap-6'>
            <div className="flex gap-4">
            <Textbox
              placeholder='رقم الصك'
              type='number'
              name='documnetNum'
              label='رقم الصك'
              className='w-full rounded'
              register={register("documnetNum", { required: "مطلوب" })}
              error={errors.documnetNum ? errors.documnetNum.message : ""}
            />            
            <Textbox
              placeholder='نوع العقار'
              type='text'
              name='type'
              label='نوع العقار'
              className='w-full rounded'
              register={register("type")}
              error={errors.type ? errors.type.message : ""}
            />            
</div>
            <div className='flex gap-4'>
            <Textbox
              placeholder='رقم الهويه العقاريه '
              type='text'
              name='identityId'
              label='رقم الهويه العقاريه '
              className='w-full rounded'
              register={register("identityId")}
              error={errors.identityId ? errors.identityId.message : ""}
            />               
            <Textbox
              placeholder='نوع الاستخدام '
              type='text'
              name='usageType'
              label='نوع الاستخدام '
              className='w-full rounded'
              register={register("usageType")}
              error={errors.usageType ? errors.usageType.message : ""}
            />               
              
            </div>
            <div className='flex gap-4'>
            <Textbox
              placeholder='مساحه العقار (م2)'
              type='number'
              name='size'
              label='مساحه العقار (م2)'
              className='w-full rounded'
              register={register("size")}
              error={errors.size ? errors.size.message : ""}
            />                                     
            <Textbox
              placeholder='رقم القطعه'
              type='number'
              name='pieceNumber'
              label='رقم القطعه'
              className='w-full rounded'
              register={register("pieceNumber")}
              error={errors.pieceNumber ? errors.pieceNumber.message : ""}
            />               
            </div>
            <div className='flex gap-4'>
            <Textbox
              placeholder='الموقع'
              type='text'
              name='site'
              label='الموقع'
              className='w-full rounded'
              register={register("site")}
              error={errors.site ? errors.site.message : ""}
            />               
            <Textbox
              placeholder='الحي'
              type='text'
              name='district'
              label='الحي'
              className='w-full rounded'
              register={register("district")}
              error={errors.district ? errors.district.message : ""}
            />               
            <Textbox
              placeholder='المدينه'
              type='text'
              name='city'
              label='المدينه'
              className='w-full rounded'
              register={register("city")}
              error={errors.city ? errors.city.message : ""}
            />               
            </div> 
            {/* // add client data with collabser here */}
            <div className="flex flex-col border-2 border-gold-dark">
              <div className='w-full cursor-pointer p-2 rounded-sm text-gray-800 text-right bg-gold-dark flex justify-between items-center hover:text-gray-100 '
              onClick={()=>setClientCollapse(!clientCollapse)}
              >
                <span>الملاك</span>
                  {clientCollapse ?<FaArrowUp size={20}/>:<FaArrowDown/>}
              </div>
              {clientCollapse && (
                <div className="flex flex-col m-2">
                   <div className='flex gap-4'>                                   
            <Textbox
              placeholder=' اسم المالك'
              type='text'
              name='name'
              label=' اسم المالك'
              className='w-full rounded'
              register={register("name")}
              error={errors.name ? errors.name.message : ""}
            />              
                  </div>
                <div className='flex gap-4 mt-2'>
                     
            <Textbox
              placeholder='رقم الهويه'
              type='number'
              name='nationalId'
              label='رقم الهويه'
              className='w-full rounded'
              register={register("nationalId",{required:"مطلوب"})}
              error={errors.nationalId ? errors.nationalId.message : ""}
            />               
            <Textbox
              placeholder='الهاتف'
              type='text'
              name='phone'
              label='الهاتف'
              className='w-full rounded'
              register={register("phone",{required:"مطلوب"})}
              error={errors.phone ? errors.phone.message : ""}
                    />   
             <Textbox
              placeholder='نسبه التمليك'
              type='number'
              name='owingPercentage'
              label='نسبه'
              className='w-full rounded'
              register={register("owingPercentage")}
              error={errors.owingPercentage ? errors.owingPercentage.message : ""}
                    />         
                  </div>                 
                </div>
              )}
            </div>
            <div className='flex gap-4'>
            <Textbox
              placeholder='سبب التقييم'
              type='text'
              name='reasone'
              label='سبب التقييم'
              className='w-full rounded'
              register={register("reasone")}
              error={errors.reasone ? errors.reasone.message : ""}
            />                                     
            <Textbox
              placeholder='الصور'
                type='file'
                accept='image/*'
              name='assets'
              label='صور العقار و الصك'
              className='w-full rounded'
              register={register("assets")}
              error={errors.assets ? errors.assets.message : ""}
            />               
            </div>                   
            <div className='text-right py-2 sm:flex sm:flex-row gap-4'>             
                <Button
                  label='تم'
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

export default AddBulding;
