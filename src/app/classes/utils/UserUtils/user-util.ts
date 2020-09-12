export class UserUtil {

    static isLogged(){
        const token = localStorage.getItem('token');
        return token !== null;
    }

    static getToken(){
        return localStorage.getItem('token');
    }
}
