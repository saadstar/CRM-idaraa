import React, { useState } from "react";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import ImgLoader from "../components/ImgLoader";
import AddBulding from "../components/bulding/AddBulding";
import { customarsColumns } from "../utils/columnsData";
import { DataGrid } from "../components/DataGrid";
import { useGetAllCustomarsQuery } from "../redux/slices";
import AddCustomar from "../components/customars&clients/AddCustomar";



const Customars = () => {
  const searchValue = useSelector((state) => state.search);  
  const [open, setOpen] = useState(false);   
  const { data,isLoading } = useGetAllCustomarsQuery({    
    isTrashed: false,
    person: searchValue
  }); 
  return isLoading ? (
    <div className='py-10 '>
      <ImgLoader />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4 text-white'>
                  <Title title={" العملاء المحتملين"} />                                
                <Button
            onClick={() => setOpen(true)}
            label='إضافه عميل جديد'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-gold-dark text-white rounded-md py-2 2xl:py-2.5'
                      />                      
      </div>
      
          <div className='w-full'>
            <DataGrid column={customarsColumns} row={data?.customars || []} url='customar'/>
          </div>
          <AddCustomar open={open} setOpen={setOpen}  />
    </div>
  );
};

export default Customars;

