import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    mixins: {
        toolbar: {
            minHeight: 60,
        },
    },
});

export const styles = {
    hamburgerMenuIcon: {
        height: '50px',
        width: '50px',
    },
    menuIconContainer: {
        marginLeft: 'auto',
        color: 'white',
        '&:hover': {
            opacity: 1,
        },
    },
}