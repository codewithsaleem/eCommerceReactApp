const keyName = "user";
const keyName1 = "user1";
function login(obj) {
   let str = JSON.stringify(obj);
   localStorage.setItem(keyName, str);
}
function register(obj) {
    let str = JSON.stringify(obj);
    localStorage.setItem(keyName1, str);
 }
function logout() {
    localStorage.removeItem(keyName);
}
function getUser1() {
    let str = localStorage.getItem(keyName1);
    let obj = str ? JSON.parse(str) : null;
    return obj;
}
function getUser() {
    let str = localStorage.getItem(keyName);
    let obj = str ? JSON.parse(str) : null;
    return obj;
}

export default {login, logout, getUser, register, getUser1}