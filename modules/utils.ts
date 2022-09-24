export const bound = (n:number, min=0, max=1):number => {
    let top = n>max?max:n
    return top<min?min:top
}