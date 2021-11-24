////Applications
import axios from "axios";
import { useQuery } from "react-query";

import { fetchStudentsKeyByPage } from "../../../util/queryKeys";
const fetchStudentsByPage = async (_pageSize, _pageIndex) => {
  const res = await axios.get(
    `http://127.0.0.1:8000/students-paging/${_pageSize}/${_pageIndex}`
  );
  return res?.data;
};
///creat function
const useGetDataByPaging = (pageSize, pageIndex) => {
  const query = useQuery(
    [fetchStudentsKeyByPage, pageSize, pageIndex],
    fetchStudentsByPage(pageSize, pageIndex)
  );

  const {
    isLoading: isLoadingStudentByPaging,
    isError: isErrorStudentByPaging,
    isSuccess: isSuccessStudentByPaging,
    refetch: refetchStudentByPaging,
    remove: removeStudentByPaging,
    data: dataStudentByPaging,
    error: errorStudentByPaging,
  } = query;
  return {
    dataStudentByPaging,
    isLoadingStudentByPaging,
    refetchStudentByPaging,
    removeStudentByPaging,
    dataStudentByPaging,
    errorStudentByPaging,
  };
};
export default useGetDataByPaging;
