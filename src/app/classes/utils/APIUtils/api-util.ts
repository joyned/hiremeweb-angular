import { environment } from 'src/environments/environment';

export class ApiUtil {

    static getPath() {
        if (environment.production) {
            return 'https://python-hire-me-api.herokuapp.com/api/';
        } else {
            return 'http://localhost:4200/api/';
        }
    }

    static buildOptions() {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: token } };
    }
}
