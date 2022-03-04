import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import firebaseInstance from 'services/firebase';

export default function Formulario() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {   
        firebaseInstance.addProduct(data).then(()=> {
           
           console.log("insertado");  
        }).catch(error => {
            console.log(error); 
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        sx={{ m: 1, width: '95%' }}
                        id="Producto"
                        label="Producto"
                        variant="standard"
                        {...register('Producto', { required: true, maxLength: 20 })}
                    />
                </Grid>

                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        sx={{ m: 1, width: '95%' }}
                        id="Total"
                        label="Precio"
                        variant="standard"
                        type="number"
                        {...register('Precio', { required: true, min: 0 })}
                    />
                </Grid>
                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        sx={{ m: 1, width: '95%' }}
                        id="Total"
                        label="Cantidad"
                        variant="standard"
                        {...register('Cantidad', { required: true, min: 0 })}
                    />
                </Grid>

                <Button sx={{ m: 1, width: '95%' }} type="submit" color="success" variant="contained">
                    Guardar
                </Button>
            </Grid>
        </form>
    );
}
