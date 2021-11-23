import axios from "axios";


export const fetchStudents = async () => {
  const res = await axios.get(`http://127.0.0.1:8000/students`);
  return res?.data;
};