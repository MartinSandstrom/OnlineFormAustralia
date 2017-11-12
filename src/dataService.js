import axios from 'axios';
const AUTH_KEY = 'ad52e4b6-5e22-42ba-bdbb-1882b9dacc77';
axios.defaults.headers.common['Auth-Key'] = AUTH_KEY;
/*

    Proxy?
    Do it from the server?
    JsonP? Security risk?

*/
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = 'https://digitalapi.auspost.com.au/postcode/search';

export const DataService = {
    getData(query, state) {
        return axios.get(proxyurl + `${BASE_URL}?q=${query}&state=${state}`);
    }
}
