import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import Loading from 'utils/Loading';
import { useVentaProductoCustom } from 'utils/querys/useVentasProductos';


const columns = [
    { field: 'Producto', headerName: 'Producto', width: 200 },
    { field: 'Cantidad', headerName: 'Cantidad', width: 180 },
    { field: 'Cliente', headerName: 'Cliente', width: 180 },
    { field: 'Precio', headerName: 'Precio', width: 180 },
    { field: 'Fecha', headerName: 'Fecha', width: 180 }
];

const Productos = () => {
    const { ventasData, loading } = useVentaProductoCustom();

    if (loading) return <Loading />;

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid autoHeight rows={!loading ? ventasData : []} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                </div>
            </div>
        </div>
    );
};

export default Productos;
