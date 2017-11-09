const {validation} = require('../src/validation.js');

describe('Validation', () => {
    test('Method postcode allows correct postcodes', () => {
        expect(validation.postcode(1337)).toBe(true);
        expect(validation.postcode(1234)).toBe(true);
        expect(validation.postcode(2026)).toBe(true);
    });
    test('Method postcode denies incorrect postcodes', () => {
        expect(validation.postcode(20000)).toBe(false);
        expect(validation.postcode(123)).toBe(false);
        expect(validation.postcode(12)).toBe(false);
        expect(validation.postcode(1)).toBe(false);
    });
    test('Method notEmpty denies empty value', () => {
        expect(validation.notEmpty('')).toBe(false);
    });
    test('Method notEmpty allows value that are not empty', () => {
        expect(validation.notEmpty('test')).toBe(true);
    });
});
