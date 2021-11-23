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
    const  { isLoading, isError, isSuccess, refetch, remove, data, error } =
    useQuery(fetchStudentsKey, fetchStudents);
  return {data,isLoading,refetch,remove,data,error};
};
export default useGetData;
