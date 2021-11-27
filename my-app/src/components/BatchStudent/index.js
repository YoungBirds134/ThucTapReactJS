import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { LoadPanel } from "devextreme-react/load-panel";

import "./BatchStudent.css";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Popup,
  Toolbar,
  Item,
  RequiredRule,
} from "devextreme-react/data-grid";
import { TextField, Button } from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";

// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetData from "./../PopUpStudent/hooks/useGetData";
import useDeleteData from "./../PopUpStudent/hooks/useDeleteData";
import useCreateData from "./../PopUpStudent/hooks/useCreateData";
import useUpdateData from "./../PopUpStudent/hooks/useUpdateData";
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
  const [isLoadingPanel, setIsLoadingPanel] = useState(false);

  const [changes, setChanges] = useState([]);
  const [editRowKey, setEditRowKey] = useState(null);
  const createMutation = useCreateData();
  const updateMutation = useUpdateData();
  const deleteMutation = useDeleteData();
  // Save params
  const gridRef = useRef(null);

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
    console.log("change: " + changes);
    setChanges(changes);
  }, []);
  const onCellClick = (e) => {
    gridRef.current?.instance?.editCell(e.rowIndex, e.columnIndex);
  };

  // Note usually that Create Field default when add row
  const onInitRow = (e) => {
    e.data.createDate = new Date();
    // e.data.id = Math.ceil(Math.random() * (10000 - 100) + 100);
  };
  const onEditRowKeyChange = React.useCallback((editRowKey) => {
    console.log(editRowKey);
    setEditRowKey(editRowKey);
  }, []);
  const onSaving = React.useCallback(
    (e) => {
      // e.cancel = true;
      debugger;

      const data = e.changes;
      createMutation.mutate(data);

      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].type === "insert") {
      //     createMutation.mutate(data[i].data);

      //     console.log("INSERT");
      //   } else if (data[i].type === "update") {
      //     updateMutation.mutate(data[i].data);

      //     console.log("UPDATE");
      //   } else {
      //     deleteMutation.mutate(data[i].key.id);
      //     console.log("REMOVE");
      //   }
      // }
    },
    []
  );

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
          // keyExpr="id"
          showBorders
          dataSource={dataStudent}
          remoteOperations={true}
          ref={gridRef}
          repaintChangesOnly={true}
          onCellClick={onCellClick}
          onInitNewRow={onInitRow}
          onSaving={onSaving}
          loadPanel
        >
          <LoadPanel
            shadingColor="rgba(0,0,0,0.4)"
            visible={isLoadingPanel}
            showIndicator={true}
            shading={true}
            showPane={true}
          />
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
            // value={date}
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
                onClick={() => gridRef.current?.instance?.cancelEditData()}
              >
                Discard
              </Button>
            </Item>
            <Item location="after">
              <Button
                variant="contained"
                icon="refresh"
                onClick={() => {
                  gridRef.current?.instance?.saveEditData();
                }}
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
