import * as Interface from '../interface';
import * as Types from '../types';

class Connection implements Interface.Connection {
    in: Types.SourcesArray | false;
    readonly out: Types.Sources;

    constructor(outSource: Types.Sources);
    constructor(outSource: Types.Sources, inSource: Types.Sources);
    constructor(outSource: Types.Sources, inSourceArray: Types.SourcesArray);
    
    constructor(outSource: Types.Sources, arg2?: any){
        this.in = false;
        this.out = outSource;
        if (arg2) {
            if (Array.isArray(arg2)) {
                this.out = outSource;
                this.in = arg2;
            }
            else {
                this.out = outSource;
                this.in = [arg2];
            }
        }
    }

    inConnect(inSource: Types.Sources): Interface.Connection {
        if (Array.isArray(this.in)) {
            this.in.push(inSource); 
        } else {
            this.in = [inSource];
        }
        return this;
    }

    disConnect(inSource: Types.Sources): Interface.Connection {
        if (Array.isArray(this.in)) {
            this.in = this.in.filter(source => source !== inSource); 
        }
        return this;
    }

    inConnects(inSourceArray: Types.SourcesArray): Interface.Connection {
        if (Array.isArray(this.in)) {
            this.in.push(...inSourceArray); 
        } else {
            this.in = inSourceArray;
        }
        return this;
    }

    disConnects(inSourceArray: Types.SourcesArray): Interface.Connection {
        if (Array.isArray(this.in)) {
            for (let i = 0; i < inSourceArray.length; i++) {
                this.disConnect(inSourceArray[i]); 
            }
        }
        return this;
    }

    isConnected(): boolean {
        return Array.isArray(this.in) && this.in.length > 0; 
    }

    lenInConnected(): number {
        return Array.isArray(this.in) ? this.in.length : 0;
    }

    clone(element: Interface.Element): Interface.Connection {
        return new Connection([this.out[0], element]);
    }

    getArrayInString(): string[]{
        let arr: string[] = [];
        if (Array.isArray(this.in)) {
            for (let i = 0; i < this.in.length; i++) {
                arr.push(this.in[i][0]);
            }  
        }
        return arr
    }

    findInString(element: Interface.Element): string{
        if (Array.isArray(this.in)) {
            for (let i = 0; i < this.in.length; i++) {
                if (this.in[i][1] === element) return this.in[i][0];
            }  
        }
        return '';
    }
}

export default Connection;