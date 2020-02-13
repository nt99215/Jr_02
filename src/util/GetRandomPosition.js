let arr = [];
export default class GetRandomPosition {
    static get ARRAY () { return arr; }
    static set ARRAY(a) { arr = a}
    static get ARRAY_RESET () {
        for(let i  = 0; i<arr.length; i++)
        {
            arr.pop();
        }
        arr = [];
    }
    constructor(num) {
        arr.push(num);
        arr.sort();
    }


}