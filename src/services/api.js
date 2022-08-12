import axios from "axios";

export default class API {
    constructor(baseUrl = "http://localhost:6060") {
        this.token = localStorage.getItem("token");
        this.instance =
            this.token === null
                ? axios.create({
                    baseURL: baseUrl,
                    timeout: 2500,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "DELETE, POST, PUT, GET, OPTIONS",
                        "Access-Control-Allow-Headers":
                            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    },
                })
                : axios.create({
                    baseURL: baseUrl,
                    timeout: 5000,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "DELETE, POST, PUT, GET, OPTIONS",
                        "Access-Control-Allow-Headers":
                            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                        Authorization: `Bearer ${this.token}`,
                    },
                });
    }
}
