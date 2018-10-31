import fetch from './fetch';

export default {
    // getClaimNotice: (reqData) => fetch.post('getClaimNotice', reqData),
    uploadOnePicture: (reqData) => fetch.post('uploadOnePicture', reqData),
}
