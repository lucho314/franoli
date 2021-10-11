import { Autocomplete, Button, Grid, TextField } from '@material-ui/core';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import db from 'servicios/fiebase';

const defaultForm={
    "Precio": 0,
    "Cliente": "",
    "Cantidad": 0,
    "Total": 0,
    "Fecha": new Date('2021-10-15').toISOString().substring(0,10),
    "ProductoId": ""
}

export default function Formulario() {
    const [stock, setStock] = useState([]);
    const { register, handleSubmit, setValue,getValues ,setFocus,reset } = useForm({defaultValues:defaultForm});
    const onSubmit = (data) =>save(data);
    
    const save=async (data)=>{
        
       await addDoc(collection(db, "Eventos"), {
            Tipo: "Salida",
           ...data,
           ProductoId: db.collection("Productos").doc(data.ProductoId)
           
          })
          
       
        reset(defaultForm);
        setValue("ProductoId","")
        
    }
    const getStock = async () => {
        const prd = [];
        const q = query(collection(db, 'Productos'), where('Stock', '>', 0));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            prd.push({
                label: doc.data().Producto,
                value: doc.id,
                precio:doc.data().Precio
            });
        });
        setStock(prd);
    };

    useEffect(() => {
        register('ProductoId');
        register('Precio');
        
        getStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calcularTotal=(field,valor) =>{
       
        const precio = (field==="Precio") ? parseInt(valor,10) : getValues("Precio")
        const cantidad = (field==="Cantidad")? parseInt(valor,10) :  getValues("Cantidad")

        const total = precio*cantidad
        
        setValue("Total",total)
    }

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
                        onChange={(e, options) => {
                            setValue('ProductoId', options.value)
                            setValue('Precio', options.precio)    
                            setFocus("Cliente")
                        }}
                        
                    />
                </Grid>
          
                <Grid item xs={12} sm={4} m={1}>
                <span>{getValues("Precio")}</span>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        sx={{ m: 1, width: '95%' }}
                        id="Cliente"
                        label="Cliente"
                        variant="standard"
                        {...register('Cliente', { required: true, maxLength: 50 })}
                    />
                </Grid>
                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        sx={{ m: 1, width: '95%' }}
                        id="Cantidad"
                        label="Cantidad"
                        variant="standard"
                        type="number"
                        {...register('Cantidad', { required: true,min:1 })}
                        onBlur={(e)=>{
                            calcularTotal("Cantidad",e.target.value)
                            setFocus("Fecha")

                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        sx={{ m: 1, width: '95%' }}
                        id="Total"
                        label="Total"
                        variant="standard"
                        type="number"
                        InputLabelProps={{ shrink: true, required: true }}
                        value={0}
                        {...register('Total', { required: true, min: 1 })}
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
                        {...register('Fecha', { required: true, maxLength: 20 })}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} m={1}>
                <Button sx={{ m: 1, width: '95%' }} color="success" variant="contained" type="submit">
                    Guardar
                </Button>
            </Grid>
        </form>
    );
}
