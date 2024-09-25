import * as lle from "../../dist/lle";
import element1 from "./element1";
import element2 from "./element2";
let element3 = (new lle.Element()).concat(element1,element2);

console.log(element3.in_connections)
console.log(element3.out_connections)