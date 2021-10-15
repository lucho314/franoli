import { Card } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { isMobile } from 'react-device-detect';
import firebaseInstance from 'services/firebase';
import FilterComponent from 'utils/FilterComponent';
import Loading from 'utils/Loading';




const columns = (!isMobile) ? [
    {
        name: 'Producto',
        selector: row => row.Producto,
        sortable: true,
       
    },
    {
        name: 'Cantidad',
        selector: row => row.Cantidad,
        sortable: true
    },
    {
        name: 'Cliente',
        selector: row => row.Cliente,
        sortable: true
    },
    {
        name: 'Precio',
        selector: row => row.Precio,
        sortable: true
    },
    {
        name: 'Fecha',
        selector: row => row.Fecha,
        sortable: true
    },
] :
    [
        {
            name: 'Producto',
            selector: row => row.Producto,
            sortable: true,
            style:{
                maxWidth : "80px",
                fontSize:'10px'
            }
           
            
           
        },
        {
            name: 'Cliente',
            selector: row => row.Cliente,
            sortable: true,
            style:{
                maxWidth : "80px",
                fontSize:'10px'
            }
            
        },
        {
            name: 'Fecha',
            selector: row => row.Fecha,
            sortable: true,
            style:{
                maxWidth : "80px",
                fontSize:'10px'
            }
        }
    ];

    const customStyles = {
        expanderButton: {
            style: {
                maxWidth : "30px"
            },
        },
        expanderCell: {
            style: {
                flex: '0 0 30px',
                minWidth:'30px'
               
            },
        }
       
    }   

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const Productos = () => {
    const [ventas, setVentas] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = ventas.filter(
        item => {
            const filter = (item.Producto && item.Producto.toLowerCase().includes(filterText.toLowerCase())
                || item.Cliente && item.Cliente.toLowerCase().includes(filterText.toLowerCase())
                || item.Fecha && item.Fecha.includes(filterText.toLowerCase())
            )
            return filter
        }
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent filterText={filterText} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} />
        );
    }, [filterText, resetPaginationToggle]);


    useEffect(() => {
        firebaseInstance.getVentas().then(vent => {
            const { ventas } = vent
            setVentas(ventas)
            setLoading(false)
        })
    }, [])

    if (loading) return <Loading />;

    return (

        (isMobile) ?
        <Card>
            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="400px"
                
            />
            </Card>
            : (
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                   
                />
            )
    );
};

export default Productos;

