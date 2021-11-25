import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { v4 as uuidv4 } from "uuid";

import "./CellStudent.css";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Popup,
  Toolbar,
  Item,
  ToolbarItem,
  RequiredRule,
} from "devextreme-react/data-grid";
import { TextField, Button } from "@material-ui/core";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetData from "./hooks/useGetData";
import useDeleteData from "./../PopUpStudent/hooks/useDeleteData";
import useCreateData from "./../PopUpStudent/hooks/useCreateData";
import useUpdateData from "./../PopUpStudent/hooks/useUpdateData";
/////////
toast.configure();

const CellStudent = () => {
  const { data, isLoading, refetch } = useGetData();
  //State

  const [changes, setChanges] = useState([]);
  const [changesTemp, setChangesTemp] = useState([]);

  // Save params
  const gridRef = useRef(null);
  const studentDataSource = new DataSource({
    store: new ArrayStore({
      key: "id",
      data: data,

      // Other ArrayStore properties go here
    }),
    // Other DataSource properties go here

    reshapeOnPush: true,
  });

  const arrTemp = [];

  const createMutation = useCreateData();
  const updateMutation = useUpdateData();
  const deleteMutation = useDeleteData();
  const renderButton = (cell) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={() => {
            gridRef.current?.instance?.deleteRow(cell.rowIndex);
          }}
        >
          remove
        </Button>
      </div>
    );
  };

  const onChangesChange = React.useCallback((changes) => {
    setChanges(changes);
  }, []);

  const onCellClick = (e) => {
    gridRef.current?.instance?.editCell(e.rowIndex, e.columnIndex);
  };

  const onInitRow = (e) => {
    e.data.createDate = new Date();
  };
  const onRowRemoved = (e) => {
    let data = e.data;

    deleteMutation.mutate(data.id);
  };
  const onSaved = React.useCallback((e) => {
    // e.cancel = true;

    console.log("Changes Temp onSaving: " + changesTemp);

    const data = e.changes;
    console.log("Data onSaving: " + data);
    setChangesTemp(changesTemp.concat(data));
    
  }, [changesTemp]);
  console.log("Changes Temp onSite: " + changesTemp);
  return (
    <div>
      <div className="main__title">
        <h1>Manage Data Student</h1>
      </div>

      <div className="main__Add"></div>
      <div className="main__body">
        <DataGrid
          dataSource={data}
          remoteOperations={true}
          ref={gridRef}
          repaintChangesOnly={true}
          onCellClick={onCellClick}
          onInitNewRow={onInitRow}
          onRowRemoved={onRowRemoved}
          onSaved={onSaved}
        >
          <Editing
            mode="cell"
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
          <Column dataField="nameStudent" dataType="string">
            {" "}
            <RequiredRule />
          </Column>
          <Column dataField="phoneStudent" dataType="string">
            {" "}
            <RequiredRule />
          </Column>
          <Column dataField="dateOfBirth" dataType="date" format="dd/MM/yyyy">
            {" "}
            <RequiredRule />
          </Column>
          <Column
            dataField="createDate"
            dataType="date"
            visible={false}
            defaultSortOrder="asc"
          />

          <Column dataField="scoreStudent" dataType="number">
            {" "}
            <RequiredRule />
          </Column>
          <Column dataField="" cellRender={renderButton}></Column>

          <Toolbar>
            <Item location="after">
              <Button
                variant="contained"
                icon="refresh"
                onClick={() => {
                  refetch();
                  toast("🦄 You are refetched", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              >
                refetch
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

export default CellStudent;
