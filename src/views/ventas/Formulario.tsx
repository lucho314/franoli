import { Autocomplete, Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import firebaseInstance from 'services/firebase';

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
    const [precio, setPrecio] = useState(0)
    const { register, handleSubmit, setValue,getValues ,setFocus,reset } = useForm({defaultValues:defaultForm});
    const onSubmit = (data) =>save(data);
    
    const save=async (data)=>{
        
        firebaseInstance.setProduct(data).then(()=>{
            reset(defaultForm);
            setValue("ProductoId","")
            setPrecio(0)
        })
  
    }

    useEffect(() => {
        register('ProductoId');
        register('Precio');
        
        firebaseInstance.getStock().then(st=>{
            const {stock} = st
            console.log(stock)
            setStock(stock)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calcularTotal=() =>{
       
       
        const cantidad =  getValues("Cantidad")

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
                            setPrecio(options.precio) 
                            calcularTotal()  
                            setFocus("Cliente")
                        }}
                        
                    />
                </Grid>
          
                <Grid item xs={12} sm={4} m={1}>
                <span>{precio}</span>
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
                        onBlur={()=>{
                            calcularTotal()
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
