import fs from "fs/promises";
import gmail from "gmail-tester";
import { expect } from '@jest/globals';

const options = 'utf8';

export const isNumber = (object) => /[0-9]/.test(object.toString());

export const dbexpect = async (path, data) => expect(await fs.readFile(path, options))
    .toEqual(data);

export const getLetters = async (after) =>
    await gmail.get_messages("credentials.json", "token.json",
        {
            from: process.env.EMAIL,
            subject: "The current rate",
            after: after
        });

export const pause = async () => new Promise((pause) => setTimeout(pause, 5000));