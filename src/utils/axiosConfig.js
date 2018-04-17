import axios from 'axios'
import * as localStorageUtils from '../utils/localStorageUtils'

const jwt = JSON.parse(localStorageUtils.localItem('JWT'));

axios.defaults.baseURL = 'http://119.29.86.19:3000/mock/11';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = jwt;


