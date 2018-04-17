/**
 * 本地数据存储或读取
 * @param {any} key
 * @param {any} value
 * @returns
 */
function localItem(key, value) {
	if (arguments.length === 1) {
		return localStorage.getItem(key) && localStorage.getItem(key) !== 'null' ? localStorage.getItem(key) : null;
	} else {
		return localStorage.setItem(key, value);
	}
}
/**
 * 删除本地数据
 * @param {any} k
 * @returns
 */
function removeLocalItem(key) {
	if (arguments.length === 1) {
		return localStorage.removeItem(key);
	} else {
		return localStorage.clear();
	}
}

function sessionItem(key, value) {
    if (arguments.length === 1) {
        return sessionStorage.getItem(key) && sessionStorage.getItem(key) !== 'null' ? sessionStorage.getItem(key) : null;
    } else {
        return sessionStorage.setItem(key, value);
    }
}

function removeSessionItem(key) {
    if (arguments.length === 1) {
        return sessionStorage.removeItem(key);
    } else {
        return sessionStorage.clear();
    }
}

export {
	localItem,
	removeLocalItem,
    sessionItem,
    removeSessionItem
}