export function debounce(func, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            //时间没到 不回执行 func.apply(this, args)/refresh  
            //例子：10张图片 在3秒内 监听了有10张图片过来 在2秒内第一张进入、 
            //创建定时器、第二张进入清空第一个定时器 依次清空上一个定时器 等到最后一张进入只用了2秒 没有图片了之后等待最后一秒过去 进行refresh
            func.apply(this, args)
        }, delay);
    }
}


export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

