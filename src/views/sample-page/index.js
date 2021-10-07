import React from 'react'
import Tabla from '../productos/Tabla'
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { Grid } from '@material-ui/core';
import { gridSpacing } from 'store/constant';
import  Formulario  from 'views/productos/Formulario';

export default function SamplePage() {
    return (
        <MainCard title="Productos">
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
                <SubCard title="Lista de productos">
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                                <Tabla/> 
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SubCard title="Nuevo Producto">
                        <Formulario />
                </SubCard>
            </Grid>
            
        </Grid>
        </MainCard>
            
    )
}
