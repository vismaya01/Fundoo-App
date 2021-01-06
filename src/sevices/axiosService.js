import axios from 'axios';

export default class axiosService {

    Post = (url, data, isHeaderRequied = false) => {
        return axios.post(url, data, isHeaderRequied)
    }

    Get = (url, data, isHeaderRequied = false) => {
        return axios.get(url, data, isHeaderRequied)
    }
}