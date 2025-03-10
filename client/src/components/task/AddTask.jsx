import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import  app  from "../../firebase";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices";
import { toast } from "sonner";
import { dateFormatter } from "../../utils";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen, task }) => { 
  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team: [],
    stage:"",
    priority: "",
    assets:[]
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues});
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [createTask,{isLoading}] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task.assets] : [];



  const submitHandler = async (data) => {
    for (const file of assets) {
      setUploading(true);
      try {
        await uploadFile(file);
      } catch (error) {
        toast.warning("خطأ في رفع الصور")
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const newData = {
        ...data,
        assets: [...URLS, ...uploadedFileURLs],
        team,
        stage,
        priority
      }

      const res = task?._id ?
        await updateTask({...newData,_id:task._id}).unwrap() :
        await createTask(newData).unwrap();
      toast.success(res.message);        
      setTimeout(() =>{
        setOpen(false);
      },500)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log("uploading");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadedFileURLs.push(downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  return (
    <div >
      <ModalWrapper open={open} setOpen={setOpen} >
        <form onSubmit={handleSubmit(submitHandler)} >
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4 text-center'
          >
            {task ? "تعديل المهمه" : "إضافه مهمه"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='تفاصيل المهمه'
              type='text'
              name='title'
              label='وصف المهمه'
              className='w-full rounded'
              register={register("title", { required: "الوصف مطلوب" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='flex gap-4'>
              <SelectList
                label='نوع المهمه'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='التاريخ'
                  type='date'
                  name='date'
                  label='تاريخ المهمه'
                  className='w-full rounded'
                  register={register("date", {
                    required: "التاريخ مطلوب",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='مستوي الأولويه'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>أضافه صور (إن وجدت)</span>
                </label>
              </div>
            </div>

            <div className='text-right py-6 sm:flex sm:flex-row gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-gold-dark'>
                  جاري الإضافه
                </span>
              ) : (
                <Button
                  label='تم'
                  type='submit'
                  className='bg-gold-dark px-8 text-sm font-semibold text-white hover:bg-gold-light  sm:w-auto'
                />
              )}

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

export default AddTask;
