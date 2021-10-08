import React, { useState } from 'react';
import Tabla from './Tabla';
import { makeStyles } from '@material-ui/styles';
import { IconLetterX, IconPlus } from '@tabler/icons';
import { Card, Grid, IconButton, Theme } from '@material-ui/core';

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

export default function VentaPage() {
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
        </>
    )
}

