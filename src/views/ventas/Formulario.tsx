import { Autocomplete, Button, Grid, TextField } from '@material-ui/core'
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import db from 'servicios/fiebase';



export default function Formulario() {

    
    const [stock,setStock] = useState([]);
    const { register, handleSubmit,setValue } = useForm();
    const onSubmit = data => console.log(data);



    const getStock =async ()=>{
        const prd=[]
        const q = query(collection(db, "Productos"), where("Stock", ">", 0));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {

            prd.push({
                label:doc.data().Producto,
                value:doc.id,
            })
            
        });
        setStock(prd)
    }

    useEffect(() => {
        register('Producto')
        getStock()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
            <Grid item xs={12} sm={4} m={1}>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={stock}
                sx={{ m: 1, width: '95%' }}
                renderInput={(params) => <TextField {...params} label="Seleccione producto" />}
                onChange={(e, options) => setValue('Producto', options.value)}
                />
            </Grid>
            <Grid item xs={12} sm={4} m={1}>
            <TextField 
            sx={{ m: 1, width: '95%' }}
                id="Cliente"
                label="Cliente"
                variant="standard"
                {...register("Cliente", { required: true, maxLength: 20 })}
                />
            </Grid>
            <Grid item xs={12} sm={4} m={1}>
            <TextField 
            sx={{ m: 1, width: '95%' }}
                id="Cantidad"
                label="Cantidad"
                variant="standard"
                {...register("Cantidad", { required: true, maxLength: 20 })}
                />
            </Grid>
            
            <Grid item xs={12} sm={4} m={1}>
            <TextField 
            sx={{ m: 1, width: '95%' }}
                id="Total"
                label="Total"
                variant="standard"
                {...register("total", { required: true, maxLength: 20 })}
                />
            </Grid>
            <Grid item xs={12} sm={4} m={1}>
                <TextField
                sx={{ m: 1, width: '95%' }}
                    name="Fecha"
                    label="Fecha"
                    id="Fecha"
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    variant="standard"
                    {...register("Fecha", { required: true, maxLength: 20 })}
                   
                />
            </Grid>
            <Grid  item xs={12} sm={4} m={1}>
           
                <Button sx={{ m: 1, width: '95%' }}  color="success" variant="contained" type="submit" >
                    Guardar
                </Button>
           
           
            </Grid>
        </Grid>
        </form>
        
    ) 
}
