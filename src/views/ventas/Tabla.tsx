import { DataGrid } from '@material-ui/data-grid';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from 'servicios/fiebase';
import Loading from 'utils/Loading';

const columns = [
    { field: 'Producto', headerName: 'Producto', width: 200 },
    { field: 'Cantidad', headerName: 'Cantidad', width: 180 },
    { field: 'Cliente', headerName: 'Cliente', width: 180 },
    { field: 'Precio', headerName: 'Precio', width: 180 },
    { field: 'Fecha', headerName: 'Fecha', width: 180 }
];

const Productos = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    const getVentas = async () => {
        const vent = [];
        const q = query(collection(db, 'Eventos'), where('Tipo', '==', 'Salida'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            // const producto= await getDoc(doc.data().ProductoId)
            vent.push({
                id: doc.id,
                //Producto:producto,
                ...doc.data()
            });
        });

        vent.forEach(async (element, i) => {
            const producto: any = await (await getDoc(element.ProductoId)).data();
            vent[i].Producto = producto.Producto;
        });
        setVentas(vent);
        setLoading(false);
    };

    useEffect(() => {
        getVentas();
    }, []);
    if (loading) return <Loading />;

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid autoHeight rows={ventas} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                </div>
            </div>
        </div>
    );
};

export default Productos;
