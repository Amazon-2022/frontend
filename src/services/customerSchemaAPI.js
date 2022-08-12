import API from "./api";

export default class customerSchemaAPI {
    constructor() {
        this.api = new API();
    }

    async create(customerSchema) {
        const body = customerSchema;
        const res = await this.api.instance.post(`/api/customerSchemas`, body);
        return res.data.data;
    }

    async getCustomerSchema(id) {
        const res = await this.api.instance.get(`/api/customerSchemas/${id}`);
        return res.data.data;
    }

    async getCustomerSchemas(customer, ns, setting) {
        const body = { customer, ns, setting };
        const res = await this.api.instance.get(`/api/customerSchemas`, body);
        return res.data.data;
    }

    async updateCustomerSchema(id, infoToUpdate) {
        const body = infoToUpdate;
        const res = await this.api.instance.put(`/api/customerSchemas/${id}`, body);
        return res.data.data;
    }

    async deleteCustomerSchema(id) {
        const res = await this.api.instance.delete(`/api/customerSchemas/${id}`);
        return res.data.data;
    }

}