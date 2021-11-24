import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import "./BatchStudent.css";
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
import useGetData from "./hooks/useGetData";
import useGetDataByPaing from "./hooks/useGetDataByPaging";
import useDeleteData from "./hooks/useDeleteData";
import useCreateData from "./hooks/useCreateData";
import useUpdateData from "./hooks/useUpdateData";
const allowedPageSizes = [5, 10, "all"];

/////////
toast.configure();
const BatchStudent = () => {
  const {
    refetchStudent,

    dataStudent,
    isErrorStudent,
    isLoadingStudent,
  } = useGetData();
  const studentDataSource = new DataSource({
    store: new ArrayStore({
      key: "id",
      data: dataStudent,

      // Other ArrayStore properties go here
    }),
    // Other DataSource properties go here

    reshapeOnPush: true,
  });
  //State
  const [changes, setChanges] = useState([]);
  const [editRowKey, setEditRowKey] = useState(null);
  
  // Save params
  const gridRef = useRef(null);

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
    console.log("changes: " + changes);
    setChanges(changes);
  }, []);
  const onCellClick = (e) => {
    console.log("Row index: " + e.rowIndex);
    console.log("Cell index: " + e.columnIndex);

    gridRef.current?.instance?.editCell(e.rowIndex, e.columnIndex);
  };

  // Note usually that Create Field default when add row
  const onInitRow = (e) => {
    e.data.createDate = new Date();
  };
  const onEditRowKeyChange = React.useCallback((editRowKey) => {
    console.log(editRowKey);
    setEditRowKey(editRowKey);
  }, []);
  return isLoadingStudent ? (
    <div>Loading...</div>
  ) : isErrorStudent ? (
    <div>An error while fetching posts</div>
  ) : (
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
          repaintChangesOnly={true}
       
          onCellClick={onCellClick}
          onInitNewRow={onInitRow}
         
        >
          <Paging defaultPageSize={5} />
          <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            displayMode="compact"
          />
          <Editing
            mode="batch"
            useIcons={true}
            changes={changes}
            onChangesChange={onChangesChange}
            editRowKey={editRowKey}
            onEditRowKeyChange={onEditRowKeyChange}
            startEditAction
            selectTextOnEditStart={true}
          >
            <TextField label="Student"></TextField>
          </Editing>

          <Column dataField="nameStudent" dataType="string" />
          <Column dataField="phoneStudent" dataType="string" />
          <Column dataField="dateOfBirth" dataType="date" format="dd/MM/yyyy" />
          <Column
            dataField="createDate"
            dataType="date"
            visible={false}
            defaultSortOrder="asc"
            // value={date}
          />

          <Column dataField="scoreStudent" dataType="number" />
          <Column dataField="" cellRender={renderButton}></Column>

          <Toolbar>
            <Item location="after">
              <Button
                variant="contained"
                icon="refresh"
                onClick={() => refetchStudent()}
              >
                Refetch
              </Button>
            </Item>
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
        </DataGrid>
      </div>

      {/* ///React Hook Form + Material Setup */}
    </div>
  );
};
//Create content customize Form

export default BatchStudent;
