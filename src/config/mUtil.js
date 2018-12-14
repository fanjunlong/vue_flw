
export const utils = {  // 新版 禁止页面滚动
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







