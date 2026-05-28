
export default class TokenStorageService {

    static setKey(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    static getKey(key: string): string | null {
        return localStorage.getItem(key);
    }

    static removeKey(key: string) {
        localStorage.removeItem(key);
    }

}