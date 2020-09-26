const APIURL = "http://localhost:3000";
const axios = require("axios");
export const requestsMixin = {
  methods: {
    getContacts() {
      return axios.get(`${APIURL}/contacts`);
    },
    addContact(data) {
      return axios.post(`${APIURL}/contacts`, data);
    },
    editContact(data) {
      return axios.put(`${APIURL}/contacts/${data.id}`, data);
    },
    deleteContact(id) {
      return axios.delete(`${APIURL}/contacts/${id}`);
    }
  }
};
