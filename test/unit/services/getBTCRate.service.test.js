import { getBTCRate } from "../../../src/services/getBTCRate.service.js";
import { describe, expect, it } from '@jest/globals';
import { isNumber } from "../helpers.js";

describe('GetBTCRate Services test', () => {
    it('Data Validity Test', async () => {
        const rate = await getBTCRate();
        expect(typeof rate).toBe("string");
        expect(isNumber(rate)).toBe(true);
    });
});