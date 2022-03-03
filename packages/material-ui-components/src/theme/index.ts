import { createMuiTheme } from '@material-ui/core/styles';
import { caES, enUS, esES } from '@material-ui/core/locale';

const fontsBase = ['"Helvetica Neue"', '"Helvetica"', 'Arial', 'sans-serif'];
const fontPrimary = [...fontsBase].join(',');
const fontSecondary = [...fontsBase].join(',');

// theme for documentation app
export const theme = createMuiTheme({
    palette: {
        background: { default: '#fcfcfc' },
        primary: { main: '#1890FF' },
        secondary: { main: '#8dafce' },
        success: { main: '#27AE60' },
        error: { main: '#EB5757' },
        text: { primary: 'rgba(0, 0, 0, 0.7)', secondary: '#809CB2' }
    },
    typography: {
        fontFamily: fontPrimary,
        h3: { fontWeight: 'bold' },
        h4: { fontWeight: 'bold' },
        h5: { fontWeight: 'bold' },
        subtitle1: { fontWeight: 500 },
        body1: { fontFamily: fontSecondary },
        body2: { fontFamily: fontSecondary },
        button: {
            // fontFamily: fontsBase,
            textTransform: 'none',
            // fontWeight: 700,
            lineHeight: 1.5
        }
    },
    props: {
        // MuiSelect: { variant: 'outlined'},
        MuiFormControl: { variant: 'outlined', size: 'small' },
        MuiList: { dense: true },
        MuiListItemText: { disableTypography: true },
        MuiMenu: {
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
            transformOrigin: { vertical: 'top', horizontal: 'left' }
        },
        MuiSwitch: { color: 'primary' },
        MuiCheckbox: { color: 'primary' },
        MuiRadio: { color: 'primary' },
        MuiButton: { variant: 'contained', style: { boxShadow: 'none' } },
        // MuiToggleButtonGroup: { size: 'small' },
        MuiTextField: {
            variant: 'outlined',
            size: 'small'
        }
    },
    mixins: {
        toolbar: {
            minHeight: 52
        }
    }
});

console.log(theme);

export default theme;
