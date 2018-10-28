import axios from 'axios'
import qs from 'qs'
import Vue from '../main'
let debug = 2;
let baseURL = debug === 2 ? 'http://ms.jr.jd.com/gw/generic/bx/h5/m' :
    'https://www.easy-mock.com/mock/5bbef6dbd84df81e4fd3c921/wf';
var axiosIns = axios.create({
    baseURL: baseURL,
    timeout: 500000,
    withCredentials: true
});

axiosIns.interceptors.request.use(config => {
    // loading
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
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        // 如果不需要除了data之外的数据，可以直接 return response.data
        const passportUrl = 'https://plogin.m.jd.com/user/login.action?appid=300&returnurl=';
        const curtUrl = window.location.href.split('/#')[0];
        let resDate =  response.data;
        let innerDate = resDate.resultData;
        if(resDate.resultCode === 3) {
            window.location.href=  encodeURI(passportUrl + curtUrl);
        }
        if(resDate.resultCode !== 0) {
            Vue.$vux.toast.text('网关系统异常');
            return
        }
        if(innerDate.resCode === '0000') {
            if(innerDate && innerDate.resData) return innerDate.resData;
        } else if(innerDate.resCode === '0011' || innerDate.resCode === '0013') { // 在报案页面 弹窗需要单独处理
            return  innerDate
        } else {
            Vue.$vux.toast.show({text: innerDate.resMsg, type: 'text', width: '250px'});
            return
        }
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
            data: qs.stringify({reqData: JSON.stringify(data)}),
            headers: {
                // 'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' // 与'X-Requested-With' 犯冲
            }
        }).then(
            (response) => {
                // console.log(response, url);
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
                console.log(response, url);
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}


