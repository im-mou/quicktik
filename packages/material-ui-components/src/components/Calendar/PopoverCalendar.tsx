import React from 'react';

import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, useStaticState, Calendar } from '@material-ui/pickers';
import Menu from '@material-ui/core/Menu';

const CalendarComponent = ({ anchor, handleCloseMenu, updateDate, initialDate }: any) => {
    // The first commit of Material-UI
    const [value, handleDateChange] = React.useState(initialDate || new Date());

    // you can past mostly all available props, like minDate, maxDate, autoOk and so on
    const { pickerProps, wrapperProps } = useStaticState({
        value,
        onChange: handleDateChange
    });

    React.useEffect(() => {
        updateDate(value);
    }, [value]);

    return (
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleCloseMenu} style={{ width: 350 }}>
            <Box px={2} pb={0} pt={1} width={1} display="block" component="div">
                <Calendar disablePast={true} {...pickerProps} />
            </Box>
        </Menu>
    );
};

const PopoverCalendar = ({ anchor, handleCloseMenu, updateDate, initialDate }: any) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CalendarComponent
                anchor={anchor}
                handleCloseMenu={handleCloseMenu}
                updateDate={updateDate}
                initialDate={initialDate}
            />
        </MuiPickersUtilsProvider>
    );
};

export default PopoverCalendar;
