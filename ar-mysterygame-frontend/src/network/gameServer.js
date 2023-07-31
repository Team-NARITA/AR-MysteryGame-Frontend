import axios from "axios";
import { getAuth } from "firebase/auth";

class GameServer {
    baseUrl = "http://localhost:8080";

    async get(endpoint, param, callback) {
        const token = await this.getToken();
        axios.get(this.baseUrl + endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: param
        }).then((response) => {
            console.log(response);
            callback(response);
        }).catch(error => {
            console.log("get Error");
            console.log(error);
        })
    }

    getUserId() {
        return getAuth().currentUser.uid;
    }

    getToken() {
        return getAuth().currentUser.getIdToken(true);
    }
}

export default new GameServer();
