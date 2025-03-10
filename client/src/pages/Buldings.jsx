import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams,Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import { useGetAllTasksQuery } from "../redux/slices";
import ImgLoader from "../components/ImgLoader";
import { buldings } from "../utils";
import BuldingCard from "../components/bulding/BuldingCard";
import AddBulding from "../components/bulding/AddBulding";

const TABS = [
  { title: "منظور الكروت", icon: <MdGridView /> },
  { title: "منظور الجداول", icon: <FaList /> },
];

const Buldings = () => {
  const searchValue = useSelector((state) => state.search);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);  
  const { data } = useGetAllTasksQuery({    
    isTrashed: "",
    search: searchValue
  });  
  const isLoading = false;


  return isLoading ? (
    <div className='py-10 '>
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

      <Tabs tabs={TABS} setSelected={setSelected}>      

                  {selected !== 1 ? (
                      // board view
                      <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
                          {buldings.map((bulding) =>(
                              <BuldingCard bulding={bulding} key={bulding._id} />
                            ))}
                          </div>          
        ) : (
          <div className='w-full'>
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>

      <AddBulding open={open} setOpen={setOpen}  />
    </div>
  );
};

export default Buldings;
