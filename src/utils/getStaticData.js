import axios from "axios/index";
import api from "../api";
import * as utils from './../utils/localStorageUtils'

let getStaticData = () => {
	axios.post(api.constant.addressList)
	.then(res => {
		utils.localItem('addressList', JSON.stringify(res.data));
	}).catch(err=>{console.log(err)});

	// ======================================================

	axios.post(api.constant.countryList)
	.then(res=>{
		utils.localItem('countryList', JSON.stringify(res.data));
	}).catch(err=>{console.log(err)});

	// ======================================================

	axios.get(api.constant.localData)
	.then(res=>{
		utils.localItem('localData', JSON.stringify(res.data));
	}).catch(err=>{console.log(err)});

	// ======================================================

	axios.get(api.constant.sessionData)
	.then(res=>{
		utils.sessionItem('sessionData', JSON.stringify(res.data));
	}).catch(err=>{console.log(err)});
};
export default getStaticData