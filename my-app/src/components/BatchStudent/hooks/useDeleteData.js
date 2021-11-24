////Applications
import axios from "axios";

import { useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const deleteStudent = async (id) => {

  await (
    await axios.delete(`http://127.0.0.1:8000/students/${id}`)
  ).data;
};
///creat function
const useDeleteData = () => {
  return useMutation((id) => deleteStudent(id), {
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
export default useDeleteData;
