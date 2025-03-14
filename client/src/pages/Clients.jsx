import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import ImgLoader from "../components/ImgLoader";
import { clientsColumns } from "../utils/columnsData";
import { DataGrid } from "../components/DataGrid";
import {  useGetClientsQuery } from "../redux/slices";



const Clients = () => {   
  const { data,isLoading } = useGetClientsQuery(); 
  
  return isLoading ? (
    <div className='py-10 '>
      <ImgLoader />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4 text-white'>
                  <Title title={" العملاء الحاليين"} />                                                                  
      </div>
      
          <div className='w-full'>
            <DataGrid column={clientsColumns} row={data?.clients || []} url='clients'/>
          </div>          
    </div>
  );
};

export default Clients;