let fourDigitReg = /(\d{4})/;

export const validation = {
    postcode(input) {
        return fourDigitReg.test(input);
    },
    notEmpty(input) {
        return input != '';
    }
}
