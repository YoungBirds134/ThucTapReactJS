import {Box,Tab} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import * as React from 'react';
import PopupStudent from "./../../components/PopUpStudent/index";
import BatchStudent from "./../../components/BatchStudent/index";
import FormStudent from "./../../components/FormStudent/index";
import CellStudent from "./../../components/CellStudent/index";

function ManageStudent() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Popup UI" value="1" />
              <Tab label="Batch UI" value="2" />
              <Tab label="Cell UI" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><PopupStudent/></TabPanel>
          <TabPanel value="2"><BatchStudent/></TabPanel>
          {/* <TabPanel value="3"><CellStudent/></TabPanel> */}
        </TabContext>
      </Box>
    );
}

export default ManageStudent;
