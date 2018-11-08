import axios from 'axios';
import env from '../../build/env';
import { Message } from 'iview';
import qs from 'qs';

let util = {

};
util.title = function (title) {
    title = title ? title  : 'iView project';
    window.document.title = title;
};
const ajaxUrl = env === 'development'
    ? 'http://192.168.10.196:8080/biaoqian_admin/'
// ? 'http://39.107.78.100:8080/biaoqian_admin/'
    : env === 'production'
        ? 'http://10.162.233.222:8888/biaoqian_admin/'
        : 'http://10.162.233.222:8888/biaoqian_admin/';
        // : 'http://192.168.10.196:8080/biaoqian_admin/';

axios.defaults.baseURL = ajaxUrl;
// axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' }
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 30000;

util.get = function (url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url,
            params: params
        }).then(res => {
            resolve(res);
        });
    });
};

util.post = function (url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            data: qs.stringify(params)
        }).then(res => {
            resolve(res);
        });
    });
};

util.result = function (res, arg) {
	let result = '成功';
	if (res.code == 100000) {
		if(arg !="隐藏"){
			result = arg + result
			Message.success(result);
		}
		
	} else {
		Message.error(res.message);
	}
	return res.data
}

export default util;