export class myUtils {
    arrayFromRange(s, e) {
        let arr = Array.from(e - s + 1);
        for (let i = 0; i < e - s + 1; i++) {
            arr[i] = i;
        }
        return (arr);
    }
    #colors = ["#e61717", "#e6c717", "#90e617", "#17e6b9", "#1782e6", "#ab17e6", "#e61790"]

    arrayOfColors(size) {
        if(size%2!==0)
            return [];
        let indices = this.arrayFromRange(0,size-1);
        let arr = Array.from(size);
        for(let i=0;i<size/2;i++)
        {
            let randCol = this.#colors[Math.floor(Math.random()*this.#colors.length)];
            let randInd1 = indices[Math.floor(Math.random()*indices.length)];
            indices.splice(indices.indexOf(randInd1),1);
            let randInd2 = indices[Math.floor(Math.random()*indices.length)];
            indices.splice(indices.indexOf(randInd2),1);
            arr[randInd1] = arr[randInd2] = randCol;
        }
        return arr;
    }
};