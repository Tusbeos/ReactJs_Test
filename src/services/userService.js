import axios from "../axios";

const handleLoginApi = (userEmail,userPassword) =>{
    return axios.post('/api/login',{ email: userEmail, password: userPassword });
}
const handleGetAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const handleCreateNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const handleDeleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const handleEditUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
export {
  handleLoginApi,
  handleGetAllUsers,
  handleCreateNewUserService,
  handleDeleteUserService,
  handleEditUserService,
};

