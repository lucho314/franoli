import { Card, Grid, IconButton } from '@material-ui/core';
import { IconLetterX, IconPlus } from '@tabler/icons';
import React, { lazy,  useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import useStylesFormulario from 'utils/useStylesFormulario';
import Tabla from './Tabla';

const Formulario = lazy(() => import('./Formulario'));

export default function VentaPage() {
    const classes = useStylesFormulario();
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);
    
    return (
        <>
            <MainCard
                title={!show ? "Listado" : "Realizar venta"}
                secondary={
                    <>
                        <Grid container className={classes.gridButton}>
                            <Grid item>
                                <IconButton
                                    className={!show ? classes.buttonAdd : classes.buttonClose}
                                    color="inherit"
                                    size="small"
                                    disableRipple
                                    onClick={toggle}
                                >
                                    {show ? <IconLetterX color="white" /> : <IconPlus />}
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                }
            >
                {show ? (
                    <Card title="Productos">
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <Formulario />
                            </Grid>
                        </Grid>
                    </Card>
                ) : (
                    <Card title="Productos">
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <Tabla />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                )}
            </MainCard>
        </>
    );
}
