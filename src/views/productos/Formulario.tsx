import React from 'react'
import {Grid,FormControl,OutlinedInput,Button} from '@material-ui/core';

export default function Formulario() {
    return (
         <Grid container>
            <Grid item xs={12} sm={12}>
                <FormControl sx={{ m: 1, width: '95%' }} variant="outlined">
                    <OutlinedInput
                        id="Producto"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        'placeholder':'Producto'
                        }}
                    />
            </FormControl> 
            </Grid>  
            <Grid item xs={12} sm={12}>
            <FormControl sx={{ m: 1, width: '95%' }} variant="outlined">
                    <OutlinedInput
                        id="Precio"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        'placeholder':'Precio'
                        }}
                    />
            </FormControl> 
            </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl sx={{ m: 1, width: '95%' }} variant="outlined">
                    <OutlinedInput
                        id="Stock"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        'placeholder':'Stock'
                        }}
                    />
            </FormControl> 
            </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl sx={{ marginTop: '3%', width: '100%' }} variant="outlined">
                <Button  color="success" variant="contained">
                    Guardar
                </Button>
            </FormControl> 
           
            </Grid>
        </Grid>
    )
}
