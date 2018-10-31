/**
 * Created by lidonghua on 2018/4/4.
 */

export const utils = {
    lock: function () {
        document.addEventListener("touchmove", utils.pageLockHandler, {capture: false, passive: false})
    },
    unlock: function () {
        document.removeEventListener("touchmove", utils.pageLockHandler, {capture: false})
    },
    pageLockHandler: function (e) {
        e.preventDefault();
    }
};

/*
 * 获取随机字符串
 * getRandomStr(8)
 * */
export function getRandomStr(len) {
    var result = [];
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789-_';
    for (var i = 0; i < len; i++) {
        var index = Math.floor(Math.random() * str.length);
        result.push(str[index]);
    }
    return result.join('');
}

/**
 * 获得当前地址栏传递参数
 * @returns {null}
 */
export function getUrlString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return r[2];
    return null;
}
export function getUrlParams(url) {
    let  formattedParams = {}
    const params  =  url.split("?")[1].split("&");
    for ( let i = 0; i < params.length; i ++) {
        formattedParams[params[i].split("=")[0]] = params[i].split("=")[1];
    }
    return formattedParams
}

export function searchParse (str) {
    var _search = window.location.search.substr(1);
    var _searchArr = _search.split('&');

    var _searchObj = {}
    _searchArr.map((value, index) => {
        var _valueArr = value.split('=');
        _searchObj[_valueArr[0]] = decodeURIComponent(_valueArr[1])
    });

    return _searchObj
}

export function getHashString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.hash.substr(2).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * 获得当前地址栏全部参数字符串
 * @returns {null}
 */
export function getAllUrlParams (url) {
    var url = url ? url : window.location.href;
    var params = url.indexOf("#") > -1 ? url.substring(url.indexOf("?"),url.indexOf("#")) :  url.substring(url.indexOf("?"))
    return params;
}

/*
 操作 sessionstorage
 */
export function setStorage(name, obj) {
    let str = JSON.stringify(obj);
    sessionStorage[name] = str
}
export function getStorage(name) {
    if (sessionStorage[name] && sessionStorage[name] != "undefined") {
        return JSON.parse(sessionStorage[name])
    } else {
        return false
    }
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * jrapp获取设备信息
 * @returns {null}
 */
export function getDeviceInfo (url) {
    let deviceInfo = {}
    //是否在金融app里，app获取设备信息。 否则只取设备指纹eid
    if(utils.isInApp('jrAPP')) {
        if(window.jsBridgeV3 != undefined) {
            window.jrBridge = window.jrBridge || window.jsBridgeV3.onReady();
            //jrapp获取设备信息
            window.jrBridge.then(function(res) {
                res.jsToGetResp(function(d) {
                    d = (typeof d == 'object') ? d : JSON.parse(d);

                    //设备信息赋值
                    deviceInfo.imei = (d.deviceInfo && d.deviceInfo.deviceId) ? d.deviceInfo.deviceId : '';
                    deviceInfo.ip = (d.deviceInfo && d.deviceInfo.IPAddress) ? d.deviceInfo.IPAddress : '';
                    deviceInfo.macAddress = (d.deviceInfo && d.deviceInfo.macAddress) ? d.deviceInfo.macAddress : '';
                    deviceInfo.openUUID = (d.deviceInfo && d.deviceInfo.OpenUDID) ? d.deviceInfo.OpenUDID : '';
                    deviceInfo.uuid = (d.deviceInfo && d.deviceInfo.UUID) ? d.deviceInfo.UUID : '';

                }, {
                    type: 9,
                    isLocation: false, //isLocation—是否要获取定位信息,原生默认为true
                    data: ''
                });
            });
        }else {
            console.error('请引入bridge')
        }

        if(utils.isInApp('iOS')) {
            deviceInfo.appType = 1
        }else if(utils.isInApp('android')){
            deviceInfo.appType = 3
        }else {
            deviceInfo.appType = 6
        }
    }else {
        deviceInfo.appType = 6
    }

    let jdRisk;
    try{
        jdRisk = getJdEid();
        deviceInfo.eid = jdRisk.eid;
        deviceInfo.fp = jdRisk.fp;
    }catch(e){
        console.error('请引入gia天盾js')
    }

    return deviceInfo;
}

export function fluxCount(pagekey){
    window._jaq = window._jaq || [];
    // alert(getUrlString('enableBalance'))
    //创建psa埋点
    window.psaProjectId = 'UA-JR-DDBT'
    _jaq.push(['_setAccount', window.psaProjectId]);
    _jaq.push(pagekey);
    (function() {
        var ja = document.createElement('script'); ja.type = 'text/javascript'; ja.async = true;
        ja.src = "//storage.360buyimg.com/static-res/js/common/psa-ag-ctm-1.0.js" //+ new Date().getTime();
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ja, s);
    })();
}


export function timestampToTime(timestamp, type) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() +0 < 10 ? '0' + (date.getDate()) : date.getDate()) + '  ';
    let h = (date.getHours() + 0 < 10) ? ('0' +(date.getHours())) + ':' : date.getHours() + ':';
    let m = (date.getMinutes() + 0 < 10) ? ('0' +(date.getMinutes())) + ':' : date.getMinutes() + ':';
    let s = (date.getSeconds() + 0 < 10) ? ('0' +(date.getSeconds())) : date.getSeconds();
    if(type === 1) {
        return Y+M+D;
    } else {
        return Y+M+D+h+m+s;
    }
}

export const hasClass = function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0 || !elem) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

export function accMul(arg1 , arg2) {
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

export function accAdd(arg1,arg2) {
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}

export function urlEncode(param, key , encode) {
    if(param == null) return '';
    var paramStr = '';
    let t = typeof param;
    if(t === 'string' || t === 'number' || t ==='boolean') {
        paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
            paramStr += urlEncode(param[i], k, encode)
        }
    }
    return paramStr;
}
