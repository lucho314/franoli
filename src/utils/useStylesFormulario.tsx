import { makeStyles } from '@material-ui/styles';

const useStylesFormulario = makeStyles(() => ({
    gridButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttonAdd: {
        color: 'white',
        backgroundColor: 'rgb(33, 150, 243)',
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'rgb(33, 150, 243)'
        }
    },
    buttonClose: {
        color: 'white',
        backgroundColor: 'red',
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'red'
        }
    }
}));

export default useStylesFormulario;
