import axios from 'axios';
axios.defaults.headers.common['Auth-Key'] = 'ad52e4b6-5e22-42ba-bdbb-1882b9dacc77'
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const URL = 'https://digitalapi.auspost.com.au/postcode/search?q=Melbourne&state=VIC';

export const DataService = {
    async getData(streetName, suburb, zipCode) {
        let data = await axios.get(proxyurl + URL, {
                headers: {
                    'Auth-Key': 'ad52e4b6-5e22-42ba-bdbb-1882b9dacc77',
                    'Content-type': 'application/json'
                }
            });
        return data;
    }
}
