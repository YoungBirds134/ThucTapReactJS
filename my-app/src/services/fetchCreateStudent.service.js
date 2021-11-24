import axios from "axios";


export const fetchStudents = async (student) => {
  const res = await axios.post(`http://127.0.0.1:8000/students`,{student});
  return res?.data;
};