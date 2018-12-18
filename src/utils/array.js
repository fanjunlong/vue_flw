function checkStr(str, type) {
    switch (type) {
        case 'phone':
            return /^1 [3|4|5|6|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card': // 身份证
            return /(^\d{15}$) | (^\d{18}$) | (^\d{17}(\d | X | x)$)/.test(str);
        case 'pwd':
            return /^[a-zA-Z]\w{5-17}$/.test(str);
        case 'postal':
            return /^[1-9][0-9]{4-9}$/.test(str);
        case "QQ":
            return /^[1-9][0-9]{5-10}$/.test(str);
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    }
}
