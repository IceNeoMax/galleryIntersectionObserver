import axios from 'axios';

const API_ROOT = 'https://api.giphy.com/v1/gifs';


export const getImages = (params) => {
  return axios.get(`${API_ROOT}/search`, { params })
    .then(resp => parseResponse(resp))
    .catch(err => parseErr(err));
}

const ERR_MESS = `there's something wrong`

const parseResponse = resp => {
  const { meta } = resp.data;
  if (meta.status === 200) {
    return resp;
  } else {
    return {
      errMess: meta.msg || ERR_MESS,
    };
  }
};


const parseErr = err => {
  const { response } = err;
  if (response) {
    const { data } = response;
    if (data && data.message) {
      return { errMess: data.message };
    }
    return { errMess: ERR_MESS };
  }
  return { errMess: ERR_MESS };
};