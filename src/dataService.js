import axios from 'axios';
axios.defaults.headers.common['Auth-Key'] = 'ad52e4b6-5e22-42ba-bdbb-1882b9dacc77'
/*

    Proxy?
    Do it from the server?
    JsonP?

*/
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = 'https://digitalapi.auspost.com.au/postcode/search';

export const DataService = {
    async getData(query, state) {
        return await axios.get(proxyurl + `${BASE_URL}?q=${query}&state=${state}`);
    }
}
