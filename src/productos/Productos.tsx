import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import Loading from 'utils/Loading';
import useProductosCustom from 'utils/querys/useProductos';

const columns = [
    { field: 'Producto', headerName: 'Producto', width: 180},
    { field: 'Precio', headerName: 'Precio', width: 180},
    { field: 'Stock', headerName: 'Stock', width: 180 }
  ];
  
  
const Productos = () => {
    const { productos, loading } = useProductosCustom();
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
