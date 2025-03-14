import { formatDate } from ".";

export const customarsColumns= [
    {
        accessorKey: "company",
        header: "الشركه",
        muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', paddingRight: '20px'}
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', paddingRight: '20px' }
        }
    },
    {
        accessorKey: "region",
        header: "المنطقه",
        muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', paddingRight: '20px'}
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', paddingRight: '20px' }
        }
    },
    {
        accessorKey: "entitySize",
        header: "الفئه",
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },
    {
        accessorKey: "sector",
        header: "القطاع",
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },
    {
        accessorKey: "person",
        header: "الشخص المسئول",
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },
    {
        accessorKey: "email",
        header: "الايميل",
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },
    {
        accessorKey: "phone",
        header: "الهاتف",
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },
    {
        accessorKey: "notes",
        header: "ملاحظات",
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },
     {
        accessorKey: "createdAt",
        header: "التاريخ",
        Cell: ({ row }) => {
            const createdAt = row.original.createdAt;            
            return formatDate(new Date(createdAt)) || "N/A"; 
        },
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },
];

export const clientsColumns= [
    {
        accessorKey: "name",
        header: "الاسم",
        muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', paddingRight: '20px'}
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', paddingRight: '20px' }
        }
    },
    {
        accessorKey: "nationalId",
        header: "رقم الهويه",
        muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', paddingRight: '20px'}
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', paddingRight: '20px' }
        }
    },        
    {
        accessorKey: "email",
        header: "الايميل",
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },
    {
        accessorKey: "phone",
        header: "الهاتف",
         muiTableHeadCellProps: {
            sx: { fontWeight: 'bold', textAlign: 'right', padding: '20px' }
        },
        muiTableBodyCellProps: {
            sx: { textAlign: 'right', padding: '20px' }
        }
    },         
];