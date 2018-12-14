import axios from 'axios'
import qs from 'qs'
import Vue from '../main' // 可以引用 Vue实例下的方法
let debug = 1;   // 1 为生产环境 2 为测试环境 可以选择easy-mock平台
let baseURL = debug === 2 ? '// prod Address' : '// test Address';

var axiosIns = axios.create({ // 公共参数
    baseURL: baseURL,
    timeout: 500000,
    withCredentials: true
});

axiosIns.interceptors.request.use(config => {
    // loading  请求前的处理 比如说增加loading
    return config
}, error => {
    return Promise.reject(error)
});

axiosIns.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
});

function checkStatus (response) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        // 如果不需要除了data之外的数据，可以直接 return response.data
        return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: 404,
        msg: '网络异常,超时或者返回有误'
    }
}

function checkCode (res) {
    return res
}

export default {
    post (url, data) {
        return axiosIns({
            url,
            method: 'post',
            // data: qs.stringify(data), // 如果 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            data,
            headers: {
                // 'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' // 与'X-Requested-With' 犯冲
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get (url, params) {
        return axiosIns({
            method: 'get',
            url,
            params, // get 请求时带的参数
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}


