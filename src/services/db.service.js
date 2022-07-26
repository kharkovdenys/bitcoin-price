import fs from "fs/promises";
import 'dotenv/config';

const options = 'utf8';

class db {

    #emails;
    #path = process.env.PATHDB;

    constructor(path) {
        if (path) {
            this.#path = path;
        } else {
            fs.readFile(this.#path, options)
                .then((emails) => this.deserialization(emails))
                .catch(() => this.clean());
        }
    }

    async customInit() {
        await fs.readFile(this.#path, options)
            .then((emails) => this.deserialization(emails))
            .catch(() => this.clean());
    }

    contains(email) {
        return this.#emails.includes(email);
    }

    deserialization(emails) {
        this.#emails = emails.split("\n");
        this.#emails.pop();
    }

    serialization() {
        return this.#emails.length === 0 ? "" : (this.#emails.join("\n") + "\n");
    }

    async add(email) {
        this.#emails.push(email);
        await fs.appendFile(this.#path, email + "\n");
    }

    async delete(email) {
        const index = this.#emails.indexOf(email);
        if (index !== -1) {
            this.#emails.splice(index, 1);
            await this.save(this.serialization());
            return true;
        }
        return false;
    }

    async clean() {
        this.#emails = [];
        this.save("");
    }

    async save(data) {
        await fs.writeFile(this.#path, data, options);
    }

    isEmpty() {
        return this.#emails.length === 0;
    }

    isNotEmpty() {
        return !this.isEmpty();
    }

    getAll() {
        return this.#emails;
    }

}

export const dbCustom = db;
export default new db;