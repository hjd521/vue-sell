/**
 * Created by 侯建东 on 2017/7/8.
 */
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.timeout = 5000;
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  getGoods(){
    return fetch('/goods');
  },
  getSeller(){
    return fetch('/seller');
  },
  getRating(){
    return fetch('./rating');
  }
}
