import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Productos from 'productos/Productos';
import React from 'react';
import { gridSpacing } from 'store/constant';
import Formulario from 'views/productos/Formulario';

export default function ProductPage() {
    return (
        <Card title="Productos">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Productos />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Formulario />
                </Grid>
            </Grid>
        </Card>
    );
}
