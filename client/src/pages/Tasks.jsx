import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTasksQuery } from "../redux/slices";
import ImgLoader from "../components/ImgLoader";

const TABS = [
  { title: "منظور الكروت", icon: <MdGridView /> },
  { title: "منظور الجداول", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();
  const status = params?.status || "";
  const searchValue = useSelector((state) => state.search);
  const [statusAr, setStatusAr] = useState("");
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);  
  const { data, isLoading } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: searchValue
  });  

  useEffect(() => {
    if (status === 'todo') {
      setStatusAr("المهام للبدأ");
    } else if (status === 'completed') {
      setStatusAr("المهام المكتمله");
    } else if("in progress") {
      setStatusAr("المهام الجاريه");
    } 
  }, [status]);

  return isLoading ? (
    <div className='py-10 '>
      <ImgLoader />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4 text-white'>
        <Title title={status ? statusAr : "كل المهام"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='إنشاء مهمه جديده'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-gold-dark text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4 '>
            <TaskTitle label='للبدأ' className={`${TASK_TYPE.todo}`} />
            <TaskTitle
              label='جاري العمل عليها'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='مكتمله' className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className='w-full'>
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen}  />
    </div>
  );
};

export default Tasks;
