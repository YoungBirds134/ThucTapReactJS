import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import "./PopUpStudent.css";
import axios from "axios";
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

import { useQuery } from "react-query";
import { fetchStudents } from "../../services/fetchStudents.service";
import { fetchStudentsKey } from "../../util/queryKeys";
///

/////////
toast.configure();
const PopUpStudent = () => {
  ///Use Query
  const { isLoading, isError, isSuccess, refetch, remove, data, error } =
    useQuery(fetchStudentsKey, fetchStudents);

  //State
  const [checkPopup, setCheckPopup] = useState(null);

  const [isShowing, setIsShowing] = useState(false);
  const [TiTlePopup, setTiTlePopup] = useState("");
  const [date, setDate] = React.useState(new Date());
  // Save params
  const gridRef = useRef(null);
  const popupRef = useRef(null);
  const studentDataSource = new DataSource({
    store: new ArrayStore({
      key: "id",
      data: data,

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
    axios
      .get("https://6130811d8066ca0017fda905.mockapi.io/Student")
      .then((res) => {});
  }, []);
  useEffect(() => {
    if (checkPopup) {
      setValue("nameStudent", checkPopup.nameStudent);
      setValue("phoneStudent", checkPopup.phoneStudent);
      setValue("dateOfBirth", checkPopup.dateOfBirth);
      setValue("scoreStudent", checkPopup.scoreStudent);
    }
  }, [checkPopup]);

  const onSubmitAdjustStudent = (student, e) => {
    let randomIdStudent = Math.floor(Math.random() * (2000 - 100 + 1) + 100);
    if (checkPopup !== null) {
      let newStudent = {
        nameStudent: student.nameStudent,
        phoneStudent: student.phoneStudent,
        dateOfBirth: student.dateOfBirth,
        scoreStudent: student.scoreStudent,
      };

      studentDataSource
        .store()
        .push([{ type: "update", data: newStudent, key: checkPopup.id }]);

      toast("🦄 You are update item", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const newStudent = {
        nameStudent: student.nameStudent,
        scoreStudent: student.scoreStudent,
        phoneStudent: student.phoneStudent,
        dateOfBirth: student.dateOfBirth,
        createDate: date,
        // id: randomIdStudent,
      };

      studentDataSource.store().push([{ type: "insert", data: newStudent }]);

      // gridRef.instance.addRow();
      toast("🦄 You are add item", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    e.target.reset();
    setCheckPopup(null);
    setIsShowing(false);
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
  const handleChangeDatetime = (newValue) => {
    setDate(newValue);
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
  const onSaving = () => {};
  const onRowRemoved = () => {
    toast("🦄 You are deleted item", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
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
              onRowRemoved={onRowRemoved}
              onSaving={onSaving}
            >
              <Editing mode="popup" useIcons={true}>
                <Popup
                  showTitle={true}
                  ref={popupRef}
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
                <Item location="after">
                  <Button
                    variant="contained"
                    icon="refresh"
                    // onClick={() => {window.location.reload(false)}}
                    // onClick={() => studentDataSource.reload()}
                    onClick={() => refetch()}
                  >
                    Refetch
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
      )}
    </>
  );
};
//Create content customize Form

export default PopUpStudent;
