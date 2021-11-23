import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
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
} from "devextreme-react/data-grid";
import { TextField, Button } from "@material-ui/core";

import { useQuery } from "react-query";
import { fetchStudents } from "../../services/fetchStudents.service";
import { fetchStudentsKey } from "../../util/queryKeys";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  useGetData  from "./hooks/useGetData";

/////////
toast.configure();

const CellStudent = () => {
  const { data, isLoading ,refetch} = useGetData();
  //State

  const [changes, setChanges] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
    if (gridRef.current?.instance.getVisibleColumnIndex(e.columnIndex)) {
      gridRef.current?.instance?.editCell(e.rowIndex, e.columnIndex);
      console.log("Cell is now visible");
    } else {
      console.log("Cell not visible");
    }
  };
  const editingStart = (e) => {
    debugger;

    // gridRef.current?.instance?.saveEditData();
  };
  const selectionChanged = (data) => {
    setSelectedRowKeys(data.selectedRowKeys);
  };
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
          repaintChangesOnly={true}
          onCellClick={onCellClick}
          editingStart={editingStart}
          selectedRowKeys={selectedRowKeys}
          onSelectionChanged={selectionChanged}
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

          <Column
            dataField="nameStudent"
            dataType="string"
            showEditorAlways={false}
          />
          <Column
            dataField="phoneStudent"
            dataType="string"
            showEditorAlways={false}
          />
          <Column
            dataField="dateOfBirth"
            dataType="date"
            format="dd/MM/yyyy"
            showEditorAlways={false}
          />
          <Column
            dataField="createDate"
            dataType="date"
            visible={false}
            defaultSortOrder="asc"
          />

          <Column
            dataField="scoreStudent"
            dataType="number"
            showEditorAlways={false}
          />
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
            {/* <Item location="after">
              <Button
                variant="contained"
                icon="refresh"
                onClick={() => gridRef.current?.instance?.saveEditData()}
                viable={false}
              >
                Save
              </Button>
            </Item> */}
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
