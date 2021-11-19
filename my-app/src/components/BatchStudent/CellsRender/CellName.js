import {Box,Tab,TextField} from '@mui/material';

import * as React from 'react';



function CellName(cellData) {
   
  
    return (
      <>
<TextField>{cellData.data.nameStudent}</TextField>
      </>
    );
}

export default CellName;
