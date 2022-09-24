import {Range} from "./Types"
export const bound = (n:number, min=0, max=1):number => {
    let top = n>max?max:n
    return top<min?min:top
}

export const norm = (n:number, from:Range = {min:0, max:255}, to:Range = {min:0, max:1}) => {
    const norm = (n-from.min)/(from.max-from.min)
    return norm*(to.max-to.min)+to.min
}