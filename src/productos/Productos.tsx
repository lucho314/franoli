import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import firebaseInstance from 'services/firebase';
import Loading from 'utils/Loading';

const columns = [
    { field: 'Producto', headerName: 'Producto', width: 180 },
    { field: 'Precio', headerName: 'Precio', width: 180 },
    { field: 'Stock', headerName: 'Stock', width: 180 }
];


const Productos = () => {
    const [Productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        firebaseInstance.getProducts().then(prd => {
            const { products } = prd
            setProductos(products)
            setLoading(false)
        })

    }, [])

    if (loading) return <Loading />

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        autoHeight
                        rows={Productos}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Productos;
