import { validateEmail } from "../../../src/utils/validateEmail.util";
import { describe, it, expect } from '@jest/globals';

describe('ValidateEmail Utils test', () => {
    it('Valid emails', () => {
        expect(validateEmail("example@email.com")).toBe(true);
        expect(validateEmail("example.first.lastname@email.com")).toBe(true);
        expect(validateEmail("example@subdomain.email.com")).toBe(true);
        expect(validateEmail("example+firstname+lastname@email.com")).toBe(true);
        expect(validateEmail("123456789@example.com")).toBe(true);
        expect(validateEmail("__@email.com")).toBe(true);
    });

    it('Invalid emails', () => {
        expect(validateEmail("exampletext")).toBe(false);
        expect(validateEmail("@#@email.com")).toBe(false);
        expect(validateEmail("@email.com")).toBe(false);
        expect(validateEmail("Example Email <example@email.com>")).toBe(false);
    });
});