////Applications
import axios from "axios";
import { useQuery } from "react-query";

import { fetchStudentsKey } from "../../../util/queryKeys";
const fetchStudents = async () => {
  const res = await axios.get(`http://127.0.0.1:8000/students`);
  return res?.data;
};
///creat function
const useGetData = () => {
  const query = useQuery(fetchStudentsKey, fetchStudents);
  const {
    isLoading: isLoadingStudent,
    isError: isErrorStudent,
    isSuccess: isSuccessStudent,
    refetch: refetchStudent,
    remove: removeStudent,
    data: dataStudent,
    error: errorStudent,
  } = query;
  return { dataStudent, isLoadingStudent, refetchStudent, removeStudent, dataStudent, errorStudent };
};
export default useGetData;
