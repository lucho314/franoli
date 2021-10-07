import { Card, Grid, IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IconLetterX, IconPlus } from '@tabler/icons';
import Productos from 'productos/Productos';
import React, { lazy, Suspense, useState } from 'react';
import Loading from 'utils/Loading';

const Formulario = lazy(() => import('views/productos/Formulario'));

const useStyles = makeStyles((theme: Theme) => ({
    gridButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        color: theme.palette.grey[800],
        backgroundColor: theme.palette.warning.main,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.warning.dark
        }
    }
}));

export default function ProductPage() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);
    return (
        <>
            <Grid container className={classes.gridButton}>
                <Grid item>
                    <IconButton className={classes.button} color="inherit" size="large" disableRipple onClick={toggle}>
                        {show ? <IconLetterX color="red" /> : <IconPlus />}
                    </IconButton>
                </Grid>
            </Grid>
            {show && (
                <Suspense fallback={<Loading />}>
                    <Card>
                        <Grid item xs={12} sm={6}>
                            <Formulario />
                        </Grid>
                    </Card>
                </Suspense>
            )}
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
        </>
    );
}
