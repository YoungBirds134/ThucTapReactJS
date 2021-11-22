import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import "./FormStudent.css";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Popup,
  Toolbar,
  Item,
  ToolbarItem,
} from "devextreme-react/data-grid";
import { TextField, Button } from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";

// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const data = [
  {
    dateOfBirth: "2000-01-02",
    nameStudent: "Nguyễn Thanh Huy",
    phoneStudent: "092365124",

    scoreStudent: 10,
    id: "1",
  },
  {
    dateOfBirth: "2000-10-09",
    nameStudent: "Nguyễn Thị Đào",
    phoneStudent: "0902554175",

    scoreStudent: 1,
    id: "12",
  },
  {
    dateOfBirth: "1960-12-29",
    nameStudent: "Trần Văn Thời",
    phoneStudent: "09025541541",

    scoreStudent: 10,
    id: "112",
  },
];

const studentDataSource = new DataSource({
  store: new ArrayStore({
    key: "id",
    data: data,

    // Other ArrayStore properties go here
  }),
  // Other DataSource properties go here

  reshapeOnPush: true,
});

/////////
toast.configure();
const FormStudent = () => {
  //State
  const [changes, setChanges] = useState([]);
  const [editRowKey, setEditRowKey] = useState(null);
  const [isRemove, setIsRemove] = useState(true);
 
  const [date, setDate] = React.useState(new Date());
  // Save params
  const gridRef = useRef(null);

  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { something: "anything" } });

  const customizeColumns = (columns) => {};
  const renderButton = (cell) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Button
          variant="contained"
          onClick={() => {
            gridRef.current?.instance?.editCell(cell.rowIndex,cell.columnIndex);
          }}
        >
          edit
        </Button> */}
        <Button
        
          variant="contained"
          onClick={() => {
            gridRef.current?.instance?.deleteRow(cell.rowIndex);
         
          }}
        >
          remove
        </Button>
        <Button
          variant="contained"
          // disabled={isAddButtonVisible}
          onClick={() => {
            gridRef.current?.instance?.undeleteRow(cell.rowIndex);
          }}
        >
          unremove
        </Button>
      </div>
    );
  };

  const onChangesChange = React.useCallback((changes) => {
    setChanges(changes);
  }, []);
  
  
  
  return (
    <div>
      <div className="main__title">
        <h1>Manage Data Student</h1>
      </div>

      <div className="main__Add"></div>
      <div className="main__body">
        <DataGrid
          dataSource={studentDataSource}
          remoteOperations={true}
          ref={gridRef}
          customizeColumns={customizeColumns}
          repaintChangesOnly={true}
          newRowPosition
          
        >
          <Editing
            mode="form"
            useIcons={true}
            changes={changes}
            onChangesChange={onChangesChange}
            // editRowKey={editRowKey}
            // onEditRowKeyChange={onEditRowKeyChange}
            startEditAction
            selectTextOnEditStart={true}
          >
            <TextField label="Student"></TextField>
          </Editing>
          {/* Create Column include Add Remove Update */}
          {/* <Column cellRender={renderButton} dataField="" /> */}
          {/* <Column dataField="id" /> */}
          <Column dataField="nameStudent" dataType="string" />
          <Column dataField="phoneStudent" dataType="string" />
          <Column dataField="dateOfBirth" dataType="date" format="dd/MM/yyyy" />
          <Column
            dataField="createDate"
            dataType="date"
            visible={true}
            defaultSortOrder="asc"
            value={date}
          />

          <Column dataField="scoreStudent" dataType="number" />
          <Column dataField="" cellRender={renderButton}></Column>

          <Toolbar>
            <Item location="after">
              <Button
                variant="contained"
                icon="refresh"
                onClick={() => gridRef.current?.instance?.cancelEditData()}
              >
                Discard
              </Button>
            </Item>
            <Item location="after">
              <Button
                variant="contained"
                icon="refresh"
                onClick={() => gridRef.current?.instance?.saveEditData()}
                viable={false}
              >
                Save
              </Button>
            </Item>
            <Item>
              <Button
                variant="contained"
                onClick={() => gridRef.current?.instance?.addRow()}
                
              >
                add
              </Button>
            </Item>
          </Toolbar>
          <Paging defaultPageSize={12} />
          <Pager showPageSizeSelector={true} />
        </DataGrid>
      </div>

      {/* ///React Hook Form + Material Setup */}
    </div>
  );
};
//Create content customize Form

export default FormStudent;
