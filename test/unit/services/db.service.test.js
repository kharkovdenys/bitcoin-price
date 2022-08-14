import { dbCustom } from "../../../src/services/db.service.js";
import { describe, expect, it } from '@jest/globals';
import { dbexpect } from "../helpers.js";
import 'dotenv/config';

const pathTest = "./test/unit/db/db.service.test.txt";

describe('DB Services test', () => {
    it('DB test', async () => {
        const dbTest = new dbCustom(pathTest);
        await dbTest.customInit();
        await dbTest.clean();

        await dbexpect(pathTest, "");
        expect(dbTest.isEmpty()).toBe(true);
        expect(dbTest.isNotEmpty()).toBe(false);

        await dbTest.add("test@cat.com");
        expect(dbTest.contains("test@cat.com")).toBe(true);
        await dbexpect(pathTest, "test@cat.com\n");
        expect(dbTest.isEmpty()).toBe(false);
        expect(dbTest.isNotEmpty()).toBe(true);
        expect(dbTest.getAll()).toEqual(["test@cat.com"]);

        dbTest.deserialization("test@cat.com\n");
        expect(dbTest.getAll()).toEqual(["test@cat.com"]);
        await dbTest.delete("test@cat.com");
        expect(dbTest.isEmpty()).toBe(true);

        await dbTest.save("save");
        await dbexpect(pathTest, "save");
    });
});