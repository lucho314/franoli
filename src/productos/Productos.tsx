import React, { useEffect, useMemo, useState } from 'react';
import DataTable from "react-data-table-component";
import { isMobile } from 'react-device-detect';
import firebaseInstance from 'services/firebase';
import FilterComponent from 'utils/FilterComponent';
import Loading from 'utils/Loading';


const columns = (isMobile)?[
    {
        name: 'Producto',
        selector: row => row.Producto,
        sortable: true,
    },
    {
        name: 'Precio',
        selector: row => row.Precio,
        sortable: true
    },
    {
        name: 'Stock',
        selector: row => row.Stock,
        sortable: true
    },
]:[
    {
        name: 'Producto',
        selector: row => row.Producto,
        sortable: true,
        style:{
           
            fontSize:'10px',
            maxWidth : "190px",
        }
    },
    {
        name: 'Precio',
        selector: row => row.Precio,
        sortable: true,
        style:{
            maxWidth : "30px",
            fontSize:'10px'
        }
    },
    {
        name: 'Stock',
        selector: row => row.Stock,
        sortable: true,
        style:{
            maxWidth : "30px",
            fontSize:'10px'
        }
    }
]
;



const Productos = () => {
    const [Productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [stock, setStock] = useState(false)
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = Productos.filter(
        item => (stock) ?
            item.Producto && item.Stock > 0 && item.Producto.toLowerCase().includes(filterText.toLowerCase())
            :
            item.Producto && item.Producto.toLowerCase().includes(filterText.toLowerCase())
    );


    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        const handleChange = () => {
            setStock(!stock);
        };

        return (
            <>
                <span style={{ marginRight: "78%", marginTop: "10px" }}>
                    Solo Stock:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={stock}
                        onChange={handleChange} />

                </span>
                <FilterComponent filterText={filterText} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} />
            </>
        );
    }, [filterText, resetPaginationToggle, stock]);

    useEffect(() => {

        firebaseInstance.getProducts().then(prd => {
            const { products } = prd
            setProductos(products)
            setLoading(false)
        })

    }, [])

    if (loading) return <Loading />

    return (

        <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
        />

    );
};

export default Productos;
