import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { v4 as uuidv4 } from "uuid";
import { LoadPanel } from "devextreme-react/load-panel";

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
  const [changesTempUpdate, setChangesTempUpdate] = useState([]);

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
    let state = changesTempUpdate;
    if (state.length > 0) {
      const removeItemDuplicate = state.filter(
        (item) => item.key.__KEY__ !== data.__KEY__
      );

      setChangesTempUpdate(removeItemDuplicate);
    }
    deleteMutation.mutate(data.id);
  };
  const onSaved = React.useCallback(
    (e) => {
      let data = e.changes;

      if (data[0].type === "update") {
        let state = changesTempUpdate;
        if (state.length > 0) {
          const removeItemDuplicate = state.filter(
            (item) => item.key.id !== data[0].key.id
          );
          removeItemDuplicate.push(data[0]);
          setChangesTempUpdate(removeItemDuplicate);
        } else if (state.length === 0) {
          state.push(data[0]);
          setChangesTempUpdate(state);
        }
      } else if (data[0].type === "insert") {
        let state = changesTempUpdate;
        state.push(data[0].data);
        setChangesTempUpdate(state);
      }
    },
    [changesTempUpdate]
  );

  return (
    <>
      <div>
        <div className="main__title">
          <h1>Manage Data Student</h1>
        </div>

        <div className="main__Add"></div>
        <div className="main__body">
          <DataGrid
            dataSource={data}
            ref={gridRef}
            onCellClick={onCellClick}
            onInitNewRow={onInitRow}
            onRowRemoved={onRowRemoved}
            onSaved={onSaved}
          >
            <LoadPanel
              id="dataGrid"
              position="right"
              shadingColor="rgba(0,0,0,1)"
              visible={isLoading || createMutation.isLoading}
              showIndicator={true}
              shading={true}
              showPane={true}
            />
            <Editing
              mode="cell"
              useIcons={true}
              changes={changes}
              onChangesChange={onChangesChange}
              // startEditAction
              // selectTextOnEditStart={true}
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
                  // onClick={() => gridRef.current?.instance?.saveEditData()}
                  onClick={() => {
                    if (changesTempUpdate.length > 0) {
                      createMutation.mutate(changesTempUpdate);
                    }
                    setChangesTempUpdate([]);
                    console.log(
                      "Changes Temp onSaving Outsite " +
                        JSON.stringify(changesTempUpdate)
                    );
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
            <Paging defaultPageSize={12} />
            <Pager showPageSizeSelector={true} />
          </DataGrid>
        </div>

        {/* ///React Hook Form + Material Setup */}
      </div>
    </>
  );
};
//Create content customize Form

export default CellStudent;
