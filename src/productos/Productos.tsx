import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import db from 'servicios/fiebase';
import Loading from 'utils/Loading';

const columns = [
    { field: 'Producto', headerName: 'Producto', width: 180},
    { field: 'Precio', headerName: 'Precio', width: 180},
    { field: 'Stock', headerName: 'Stock', width: 180 }
  ];
  
  
const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true)

    const getProductos = async ()  => {
        db.collection('Productos').onSnapshot((querySnapshot) => {
            const prd = [];
            querySnapshot.forEach((doc) => {
                prd.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setProductos(prd);
            setLoading(false)
           
        });
      
    };

    useEffect(() => {
        getProductos();
    }, []);
    if(loading) return <Loading />
 
    return (
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                    <DataGrid
                    autoHeight
                    rows={productos}
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
