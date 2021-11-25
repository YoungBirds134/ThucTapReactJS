import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { LoadPanel } from "devextreme-react/load-panel";
import "./PopUpStudent.css";

import moment from "moment";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Popup,
  Toolbar,
  Item,
  Scrolling,
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

///

/////////
toast.configure();
const PopUpStudent = () => {
  ///Use Query
  const {
    refetchStudent,
    
    dataStudent,
    isErrorStudent,
    isLoadingStudent,
  } = useGetData();
  
  setTimeout(dataStudent,5000000);
  //State
  const allowedPageSizes = [5, 10, "all"];
  const [checkPopup, setCheckPopup] = useState(null);
  const [page, setPage] = useState({ _pageIndex: 1, _pageSize: 5 });
  const [isLoadingPanel, setIsLoadingPanel] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [TiTlePopup, setTiTlePopup] = useState("");

  // Save params
  const gridRef = useRef(null);

  const studentDataSource = new DataSource({
    store: new ArrayStore({
      key: "id",
      data: dataStudent,

      // Other ArrayStore properties go here
    }),
    // Other DataSource properties go here

    reshapeOnPush: true,
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { something: "anything" } });

  useEffect(() => {
    if (checkPopup) {
      setValue("nameStudent", checkPopup.nameStudent);
      setValue("phoneStudent", checkPopup.phoneStudent);
      setValue("dateOfBirth", checkPopup.dateOfBirth);
      setValue("scoreStudent", checkPopup.scoreStudent);
    }
  }, [checkPopup]);

  const createMutation = useCreateData();
  const updateMutation = useUpdateData();
  const deleteMutation = useDeleteData();
  // const {
  //   dataStudentByPaging,
  //   isLoadingStudentByPaging,
  //   refetchStudentByPaging,
  //   removeStudentByPaging,

  //   errorStudentByPaging,
  // } = useGetDataByPaging(page);

  const { isLoading, isError, error, isSuccess } = createMutation;

  const onSubmitAdjustStudent = async (student, e) => {
    if (checkPopup !== null) {
      let convertDate = moment(student.dateOfBirth).format("YYYY-MM-DD");
      let newStudent = {
        id: checkPopup.id,
        nameStudent: student.nameStudent,
        phoneStudent: student.phoneStudent,
        dateOfBirth: convertDate,
        scoreStudent: student.scoreStudent,
      };
      updateMutation.mutate(newStudent);
      studentDataSource
        .store()
        .push([{ type: "update", data: newStudent, key: checkPopup.id }]);
    } else {
      const newStudent = {
        nameStudent: student.nameStudent,
        scoreStudent: student.scoreStudent,
        phoneStudent: student.phoneStudent,
        dateOfBirth: student.dateOfBirth,

        // id: randomIdStudent,
      };
      createMutation.mutate(student);
      studentDataSource.store().push([{ type: "insert", data: newStudent }]);
    }
    e.target.reset();
    setCheckPopup(null);
    setIsShowing(false);
    setIsLoadingPanel(true);
  };

  const onHidePopup = (e) => {
    setIsShowing(false);
    setCheckPopup(null);
  };
  const onShown = () => {
    setIsShowing(true);
  };
  const onShowing = () => {
    if (checkPopup !== null) {
      setTiTlePopup("Update Student");
    } else {
      setTiTlePopup("Add Student");
    }
  };

  const renderContent = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmitAdjustStudent)}>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name Student"
              variant="outlined"
              {...register("nameStudent", {
                maxLength: 100,
                minLength: 3,

                required: true,
              })}
            />
            {errors.nameStudent?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}{" "}
            {errors.nameStudent?.type === "minLength" && (
              <p style={{ color: "red" }}>You are input name invalid</p>
            )}{" "}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone Student"
              variant="outlined"
              {...register("phoneStudent", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />

            {errors.phoneStudent?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors.phoneStudent?.type === "maxLength" && (
              <p style={{ color: "red" }}>Phone Number 10 char</p>
            )}
            {errors.phoneStudent?.type === "minLength" && (
              <p style={{ color: "red" }}>Phone Number 10 char</p>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <TextField
              type="date"
              fullWidth
              id="outlined-basic"
              variant="outlined"
              {...register("dateOfBirth", { required: true })}
            />

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                name="dateOfBirth"
                label="Date desktop"
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={handleChangeDatetime}
                renderInput={(params) => (
                  <TextField {...register("dateOfBirth")} {...params} />
                )}
              />
            </LocalizationProvider> */}
            {errors.dateOfBirth?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Score Student"
              variant="outlined"
              {...register("scoreStudent", {
                required: true,
                minLength: 1,
                maxLength: 2,
              })}
            />
            {errors.phoneStudent?.type === "maxLength" && (
              <p style={{ color: "red" }}>Score between 0 and 10</p>
            )}
            {errors.scoreStudent?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "100px",
            }}
          >
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button type="reset" onClick={onHidePopup} variant="contained">
              Cancel
            </Button>
          </div>
        </form>
      </>
    );
  };
  // Process Button: Edit and Remove

  // Render button and add Row

  const onRowRemoving = (e) => {
    setIsLoadingPanel(true);
    console.log("Key: " + e.data);
    let data = e.data;
    // deleteMutation.mutate(data.id);
    deleteMutation.mutate(data.id);
  };

  const onSaving = React.useCallback((e) => {
    setIsLoadingPanel(true);
  }, []);
  const onInitRow = (e) => {
    e.data.createDate = new Date();
    // e.data.id = Math.ceil(Math.random() * (10000 - 100) + 100);
  };
  const deleteLoading = () => {
    setIsLoadingPanel(true);
  };
  const renderButton = (cell) => {
    ///How to Debugger: Put Break point and add debugger

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={() => {
            gridRef.current?.instance?.editRow(cell.rowIndex);
            setCheckPopup(cell.data);
          }}
        >
          edit
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            gridRef.current?.instance?.deleteRow(cell.rowIndex);
            deleteLoading();
          }}
        >
          remove
        </Button>
      </div>
    );
  };

  const renderTitle = () => {
    return <p>{TiTlePopup}</p>;
  };

  return (
    <>
      {/* {isLoadingStudent ? (
        <div>Loading...</div>
      ) : isErrorStudent ? (
        <div>An error while fetching posts</div>
      ) : ( */}
        <div>
          <div className="main__title">
            <h1>Manage Data Student</h1>
          </div>

          <div className="main__Add"></div>
          <div className="main__body">
            <DataGrid
              dataSource={dataStudent||[]}
              remoteOperations={true}
              ref={gridRef}
              loadPanel
              enabled={true}
              onRowRemoving={onRowRemoving}
              // onSaving={onSaving}
              onInitNewRow={onInitRow}
            >
              <LoadPanel
                position="center"
                shadingColor="rgba(0,0,0,1)"
                visible={isLoadingStudent}
                showIndicator={true}
                shading={true}
                showPane={true}
              />
              <Scrolling rowRenderingMode="virtual"></Scrolling>
              <Paging defaultPageSize={5} />
              <Pager
                visible={true}
                allowedPageSizes={allowedPageSizes}
                displayMode="compact"
              />
              <Editing mode="popup" useIcons={true}>
                <Popup
                  showTitle={true}
                  width={700}
                  height={725}
                  visible={isShowing}
                  titleRender={renderTitle}
                  onShown={onShown}
                  onShowing={onShowing}
                  // Customize Popup
                  contentRender={renderContent}
                >
                  <ToolbarItem />
                </Popup>
                <TextField label="Student"></TextField>
              </Editing>
              {/* Create Column include Add Remove Update */}
              <Column cellRender={renderButton} dataField="" />
              <Column dataField="nameStudent" dataType="string" />
              <Column dataField="phoneStudent" dataType="string" />
              <Column
                dataField="dateOfBirth"
                dataType="date"
                format="dd/MM/yyyy"
              />
              <Column
                dataField="createDate"
                dataType="date"
                visible={false}
                defaultSortOrder="asc"
              />
              <Column dataField="scoreStudent" dataType="number" />
              <Toolbar>
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
      {/* )} */}
    </>
  );
};
//Create content customize Form

export default PopUpStudent;
