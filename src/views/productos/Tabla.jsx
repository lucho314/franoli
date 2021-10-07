import React,{ useState,useEffect } from 'react'
import { DataGrid} from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import db from '../../Servicios/fiebase'




const columns = [
    { field: 'Producto', headerName: 'Producto', width: 180},
    { field: 'Precio', headerName: 'Precio', width: 180},
    { field: 'Stock', headerName: 'Stock', width: 180 }
  ];
  

export default function Tabla() {
    const [productos,setProductos] = useState([])
    
    const getProductos = async ()=>{
        db.collection('Productos').onSnapshot((querySnapshot)=>{
            const prd=[]
            querySnapshot.forEach(doc => {
                prd.push({
                    id: doc.id, 
                    ...doc.data()
                })
            });
            setProductos(prd)
        })

    }

    useEffect(() => {
        getProductos()
    }, [])
        

    const { data } = useDemoData({
        rowLength: 4,
        maxColumns: 5,
      });

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                    <DataGrid
                    autoHeight {...data}
                    rows={productos}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </div>

       
    )
}
