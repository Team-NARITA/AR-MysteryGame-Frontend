import axios from "axios";
import { getAuth } from "firebase/auth";

class GameServer {
    baseUrl = "http://api.ar-mysterygame.rain1208.com:8080";

    async get(endpoint, param, callback) {
        console.log("GetRequest: " + endpoint);
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

    async post(endpoint, param, callback) {
        console.log("PostRequest: " + endpoint);
        const token = await this.getToken();
        const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        axios.post(this.baseUrl + endpoint, param, { headers: header }
        ).then((response) => {
            console.log(response);
            callback(response);
        }).catch(error => {
            console.log("Post Error");
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
