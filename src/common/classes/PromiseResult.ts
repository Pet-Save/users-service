export default class PromiseResult {
    private _fulfilled: string[];
    private _rejected: { originalname: string, reason: string }[];
    
    constructor() {
        this._fulfilled = [];
        this._rejected = [];
    }

    getFulfilled = () => this._fulfilled;

    setFullfilled = (info: string) => {
        this._fulfilled.push(info)
    }

    getRejected = () => this._rejected;

    setRejected = (info: { originalname: string, reason: string }) => {
        this._rejected.push(info)
    }
}