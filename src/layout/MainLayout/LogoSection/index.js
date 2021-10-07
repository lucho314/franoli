import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports
import config from 'config';
import logo from '../../../assets/images/PERFIL.png';

// ===========================|| MAIN LOGO ||=========================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
         <img src={logo} alt="Logo"  style={{height: "70px",marginLeft: "50px"}}  /> 
    </ButtonBase>
);

export default LogoSection;
