import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from 'servicios/fiebase';

const useProductosCustom = () => {
    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState<any>();

    useEffect(() => {
        async function fetchMyAPI() {
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

        }
        fetchMyAPI();
    }, []);

    return { productos, loading };
};

export default useProductosCustom;
