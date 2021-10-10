import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
// material-ui
import { useTheme } from '@material-ui/styles';
import React from 'react';


// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ===========================|| CUSTOM MAIN CARD ||=========================== //

type Props = {
    border?: boolean;
    boxShadow?: boolean;
    children?: React.ReactNode;
    content?: boolean;
    contentClass?: string;
    contentSX?: any;
    darkTitle?: boolean;
    secondary?: any;
    shadow?: string;
    sx?: any;
    title?: any;
};
const MainCard = React.forwardRef((props: Props, ref) => {
    const {
        border = true,
        boxShadow,
        children,
        content = true,
        contentClass,
        contentSX,
        darkTitle,
        secondary,
        shadow,
        sx = {},
        title,
        ...others
    } = props;
    const theme: any = useTheme();

    return (
        <Card
            ref={ref as any}
            {...others}
            sx={{
                border: border ? '1px solid' : 'none',
                borderColor: theme.palette.primary[200] + 75,
                ':hover': {
                    boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                },
                ...sx
            }}
        >
            {/* card header and action */}
            {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
            {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

            {/* content & header divider */}
            {title && <Divider />}

            {/* card content */}
            {content && (
                <CardContent sx={contentSX} className={contentClass}>
                    {children}
                </CardContent>
            )}
            {!content && children}
        </Card>
    );
});

export default MainCard;
