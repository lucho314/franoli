import { Card, Grid, IconButton } from '@material-ui/core';
import { IconLetterX, IconPlus } from '@tabler/icons';
import Productos from 'productos/Productos';
import React, { lazy, Suspense, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Loading from 'utils/Loading';
import useStylesFormulario from 'utils/useStylesFormulario';

const Formulario = lazy(() => import('views/productos/Formulario'));

export default function ProductPage() {
    const classes = useStylesFormulario();
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);
    return (
        <>
            <MainCard
                title={!show ? 'Listado' : 'Crear producto'}
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
                    <Suspense fallback={<Loading />}>
                        <Card>
                            <Grid item xs={12} sm={12}>
                                <Formulario />
                            </Grid>
                        </Card>
                    </Suspense>
                ) : (
                    <Card title="Productos">
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <Productos />
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
