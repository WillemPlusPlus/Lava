import colourNames from "../data/color-names"
import {bound} from "./utils"
import {Channels} from "./Types"

class Color{

    channels: Channels
    alpha: 1


    constructor(){

    }

    get rgb(){
        return
    }

    get rgba(){
        return
    }

    get hsv(){
        return 
    }

    get hex(){
        return 
    }

    get css(){
        return
    }

    /**
     * map a RGB color to its HSV representation
     * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
     * @param rgb [red, green, blue]: numbers in range 0-1
     * @returns [hue, sat, value]: numbers in range 0-1
     */
    static rgbToHsv(rgb:Channels):Channels{
        
        const max = Math.max(...rgb)
        const min = Math.min(...rgb)
        const c = max-min
        const s = max?(c/max):0
        let h = 0
        if(c){
            while(rgb[h]!=max)h++
            const x = (h+1)%3-(h+2)%3
            h = (h*2+x/min)/6
        }

        return [h,s,max]


    }

    /**
     * map a HSV color to its RGB representation
     * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
     * @param hsv [hue, sat, value]: numbers in range 0-1
     * @returns [red, green, blue]: numbers in range 0-1
     */

    static hsvToRgb(hsv:Channels):Channels{
        let h = bound(hsv[0]) * 6
        let s = bound(hsv[1])
        let v = bound(hsv[2])

        const c = v * s
        const x = c * (1 - Math.abs(h % 2 - 1))
        const m = v - c;

        let rgb = [x+m, c+m, m]

        if(Math.floor(h) % 2)rgb = [c+m, x+m, m]
        if(h> 2)rgb.unshift(rgb.pop() as number);
        if(h > 4)rgb.unshift(rgb.pop() as number);
        

        return [rgb[0],rgb[1],rgb[2]];

    }


    
}