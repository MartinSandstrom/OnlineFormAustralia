const URL = 'https://digitalapi.auspost.com.au/postcode/search';
const key = 'auth-key'

export const DataService = {
    getData(streetName, suburb, zipCode) {
        return DataService.fetchData();
    },
    async fetchData() {
         let response = await fetch(URL);
         console.log(response);
         let data = await response.json();
         return data;
    }
}
