import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import firebaseInstance from 'services/firebase';
import Loading from 'utils/Loading';


const columns = [
    { field: 'Producto', headerName: 'Producto', width: 200 },
    { field: 'Cantidad', headerName: 'Cantidad', width: 180 },
    { field: 'Cliente', headerName: 'Cliente', width: 180 },
    { field: 'Precio', headerName: 'Precio', width: 180 },
    { field: 'Fecha', headerName: 'Fecha', width: 180 }
];

const Productos = () => {
    const [ventas, setVentas] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        firebaseInstance.getVentas().then(vent=>{
            const{ventas} =vent
            setVentas(ventas)
            setLoading(false)
        })
    }, [])

    if (loading) return <Loading />;

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid autoHeight rows={ ventas } columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                </div>
            </div>
        </div>
    );
};

export default Productos;
