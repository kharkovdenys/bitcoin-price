import { dbCustom } from "../../../src/services/db.service.js";
import { sendCurrentRate } from "../../../src/services/sendCurrentRate.service.js";
import { describe, expect, it, jest } from '@jest/globals';
import 'dotenv/config';
import { getLetters, pause } from "../helpers.js";

jest.setTimeout(30000);

const pathTest = "./test/unit/db/sendCurrentRate.service.test.txt";

describe('SendCurrentRate Services test', () => {
    it('SendLetter test', async () => {
        const dbTest = new dbCustom(pathTest);
        await dbTest.customInit();
        await dbTest.clean();

        await dbTest.add(process.env.EMAILTEST);
        const currentDate = new Date().toISOString();
        await sendCurrentRate(dbTest.getAll());
        await pause();
        const letters = await getLetters(currentDate);
        expect(letters.length >= 1).toBe(true);
    });
});