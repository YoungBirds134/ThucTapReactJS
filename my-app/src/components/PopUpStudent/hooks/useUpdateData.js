////Applications
import axios from "axios";

import { useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStudent = async (student) => {
  await (
    await axios.put(`http://127.0.0.1:8000/students/${student.id}`, student)
  ).data;
};
///creat function
const useUpdateData = () => {
  return useMutation((student) => UpdateStudent(student), {
    onSuccess: (_, { onSuccess, status }) => {
      toast("🦄 API CALLED", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (_, { onError }) => {
      toast("🦄 API DON'T CALLED", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};
export default useUpdateData;
