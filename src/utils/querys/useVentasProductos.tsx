import { collection, DocumentData, DocumentReference, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from 'servicios/fiebase';

export type Venta = {
    Cantidad: number;
    Cliente: string;
    Fecha: string;
    Precio: number;
    Producto: string;
    ProductoId: DocumentReference<DocumentData>;
    Tipo: string;
    Total: number;
    id: string;
};

export const useVentaProductoCustom = () => {
    const [loading, setLoading] = useState(true);
    const [ventasData, setVentasData] = useState<any>();

    useEffect(() => {
        async function fetchMyAPI() {
            const ventas: Array<Venta> = [];
            const productos = [];
            const q = query(collection(db, 'Productos'));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc: DocumentData) => {
                productos.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            const qEv = query(collection(db, 'Eventos'), where('Tipo', '==', 'Salida'));
            const querySnapshotEv = await getDocs(qEv);
            querySnapshotEv.forEach((doc: DocumentData) => {
                ventas.push({
                    id: doc.id,
                    ...doc.data(),
                    Producto: productos.find((poduct) => poduct.id === doc.data().ProductoId.id).Producto
                });
            });

            setVentasData(ventas);
            setLoading(false);
        }
        fetchMyAPI();
    }, []);

    return { ventasData, loading };
};
 