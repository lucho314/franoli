import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';

const useStyles = makeStyles({
    loadingShadingMui: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },

    loadingIconMui: {
        position: 'absolute',
        fontSize: '20px',
        top: 'calc(45% - 10px)',
        left: 'calc(50% - 10px)'
    }
});

const Loading = (props) => {
    const classes = useStyles(props);
    return (
        <div className={classes.loadingShadingMui}>
            <CircularProgress className={classes.loadingIconMui} />
        </div>
    );
};

export default Loading