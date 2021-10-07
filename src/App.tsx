import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
// project imports
import NavigationScroll from './layout/NavigationScroll';
// routing
import Routes from './routes';
// defaultTheme
import themes from './themes';

// ===========================|| APP ||=========================== //

const App = () => {
    const customization = useSelector((state) => state);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
