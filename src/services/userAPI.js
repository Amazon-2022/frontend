import API from "./api";

export default class usersAPI {
    constructor() {
        this.api = new API();
    }

    async register(user) {
        const body = user;
        const res = await this.api.instance.post(`/register`, body);
        const token = res.data.token;
        localStorage.setItem("token", token);
        return token;
    }

    async login({ username, password }) {
        try {
            const body = { username, password };
            const res = await this.api.instance.post(`/authenticate`, body);
            const token = res.data.token;
            localStorage.setItem("token", token);
            return { status: res.status, role: res.data.role };
        } catch (err) {
            return 403;
        }
    }

    async getIDFromToken() {
        const res = await this.api.instance.get("/api/getUserID");
        return res.data.data;
    }

    async checkLogin() {
        const token = localStorage.getItem("token");
        if (token === null) {
            return false;
        }
        const body = { "token": token };
        const res = await this.api.instance.post(`/verify`, body);
        return res.status === 201 ? true : false;
    }

    async getUser(id) {
        const res = await this.api.instance.get(`/api/users/${id}`);
        return res.data.data;
    }

    async getUsers(username) {
        const res = username ? await this.api.instance.get(`/api/users?username=${username}`) :
        await this.api.instance.get(`/api/users`);
        return res.data.data;
    }

    async updateUser(id, infoToUpdate) {
        const body = infoToUpdate;
        const res = await this.api.instance.put(`/api/users/${id}`, body);
        return res.data.data;
    }

    async deleteUser(id) {
        const res = await this.api.instance.delete(`/api/users/${id}`);
        return res.data.data;
    }

}