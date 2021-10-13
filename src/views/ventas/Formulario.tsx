import { Autocomplete, Button, Grid, Paper, styled, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import firebaseInstance from 'services/firebase';

const defaultForm = {
    "Precio": 0,
    "Cliente": "",
    "Cantidad": 0,
    "Total": 0,
    "Fecha": new Date().toISOString().substring(0, 10),
    "ProductoId": ""
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: '20px'
}));

export default function Formulario() {
    const [stock, setStock] = useState([]);
    const [precio, setPrecio] = useState(0)
    const { register, handleSubmit, setValue, getValues, setFocus, reset } = useForm({ defaultValues: defaultForm });
    const onSubmit = (data) => save(data);

    const save = async (data) => {
        firebaseInstance.setProduct(data).then(() => {
            reset(defaultForm);
            setValue("ProductoId", "")
            setPrecio(0)
            getStock()
        }).catch((err) => alert(err))
            .finally(() => console.log("Final"))

    }

    const getStock = () => {
        firebaseInstance.getStock().then(st => {
            const { stock } = st
            setStock(stock)
        })
    }

    useEffect(() => {
        register('ProductoId');
        register('Precio');
        getStock()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calcularTotal = () => {


        const cantidad = getValues("Cantidad")

        const total = precio * cantidad

        setValue("Total", total)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container justifyContent="center"
                alignItems="center">
                <Grid item xs={12} sm={4} m={1}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={stock}
                        sx={{ m: 1, width: '95%' }}
                        renderInput={(params) => <TextField {...params} label="Seleccione producto" />}
                        onChange={(e, options) => {
                            if (options) {
                                setValue('ProductoId', options.value)
                                setPrecio(options.precio)
                                calcularTotal()
                                setFocus("Cliente")
                            }
                            else {
                                setValue('ProductoId', "")
                                setPrecio(0)
                            }

                        }}

                    />
                </Grid>

                <Grid item xs={12} sm={4} m={1}>
                    <Item>Precio: ${precio}</Item>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        sx={{ m: 1, width: '95%' }}
                        id="Cliente"
                        label="Cliente"
                        InputLabelProps={{required: true }}
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
                        InputLabelProps={{required: true }}
                        {...register('Cantidad', { required: true, min: 1 })}
                        onBlur={() => {
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
            <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={5} sm={2} m={1}>
                    <Button sx={{ m: 1, width: '95%' }} color="secondary" variant="contained">
                        Limpiar
                    </Button>
                </Grid>
                <Grid item xs={5} sm={2} m={1}>
                    <Button sx={{ m: 1, width: '95%' }} color="success" variant="contained" type="submit">
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
