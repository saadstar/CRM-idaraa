import React, {  useState } from "react";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import Table from "../components/task/Table";
import { useGetAllBuldingsQuery } from "../redux/slices";
import ImgLoader from "../components/ImgLoader";
import BuldingCard from "../components/bulding/BuldingCard";
import AddBulding from "../components/bulding/AddBulding";


const Buldings = () => {
  const searchValue = useSelector((state) => state.search);  
  const [open, setOpen] = useState(false);  
  const { data,isLoading } = useGetAllBuldingsQuery({    
    isTrashed: false,
    documnetNum: searchValue
  });

  return isLoading ? (
    <div className='py-10'>
      <ImgLoader />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4 text-white'>
                  <Title title={"كل العقارات"} />                                
                <Button
            onClick={() => setOpen(true)}
            label='إضافه تقييم جديد'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-gold-dark text-white rounded-md py-2 2xl:py-2.5'
                      />                      
      </div>     
              <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
     {data?.buldings.map((bulding) =>(
                  <BuldingCard bulding={bulding} />
   ))}
                </div>       
       

      <AddBulding open={open} setOpen={setOpen}  />
    </div>
  );
};

export default Buldings;
