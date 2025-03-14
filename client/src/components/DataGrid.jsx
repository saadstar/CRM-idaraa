import React, { useMemo ,useState} from 'react';
import {MaterialReactTable} from "material-react-table";
import { MdDeleteOutline } from "react-icons/md";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ConfirmatioDialog from './Dialogs';
import { useTrashCustomarMutation } from '../redux/slices/customarSlice';
import {toast} from "sonner";


export const DataGrid = ({column,row,url}) => {  
    const darkTheme = createTheme({
        palette: {
          mode: "dark",
        },
      });           
    const [selected, setSelected] = useState(null); 
    const [openDialog, setOpenDialog] = useState(false); 
    const [trashCustomer]=useTrashCustomarMutation();
     
      const deleteClicks = (id) => {
          setSelected(id);
          setOpenDialog(true);
        };
      
        const deleteHandler = async () => {
          try {
           const res = await trashCustomer({
              id: selected?.id,
              isTrash: true,
              url
            }).unwrap();
            setOpenDialog(false); 
            toast.success(res?.message);
          } catch (err) {
            toast.error(err?.data?.message || err.error)
          }
        }; 

    const columns=useMemo(() =>[...column, {
        accessorKey: "delete",
        header: "حذف",
        Cell: ({ row }) => (
            <div
                onClick={() => deleteClicks({id:row.original._id,name:row.original.name})}
                aria-label="delete"
                className='p-3 text-red-500 cursor-pointer'
            >
                <MdDeleteOutline size={20}/>
            </div>
        ),
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },]   );
    return (
        <ThemeProvider theme={darkTheme}>
        <div className="table-container ">           
                <MaterialReactTable columns={columns} data={row}  />            
        </div>
        <ConfirmatioDialog
                  open={openDialog}
                  setOpen={setOpenDialog}
                  onClick={deleteHandler}
                />
        </ThemeProvider>
    )
}