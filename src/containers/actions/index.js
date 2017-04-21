import axios from 'axios';
// https://github.com/mzabriskie/axios/issues/318

const sendFileToServer = (url) => files => {
  const formData = new FormData();
  formData.append('file', files[0]);

  //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const config = { headers: { 'Accept': 'application/json' } };
  return axios.post(url, formData, config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default {
  sendFileToServer,
};