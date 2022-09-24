import colourNames from "../data/color-names"
import {bound, norm} from "./utils"
import {Channels} from "./Types"

class Color{
    static ERROR_CONSTRUCT_MODE = "Color object constructor error: This input type cannot be used with this contructor mode"
    channels: Channels
    alpha:number
    name:string

    /**
     * new Color Object
     * @param channels Channels | string
     * @param mode 
     *  0 : RGB [0-255,0-255,0-255]
     *  1 : HSV [0-360,0-1,0-1]
     *  2 : hexadecimal string
     *  3 : css color string
     * @param alpha number 0-1
     */

    constructor(channels:Channels|string, mode=0, alpha = 1){
        switch(mode){
            case 0:
                if(typeof channels == "string") throw new Error(Color.ERROR_CONSTRUCT_MODE)
                this.channels = channels.map(c=>norm(c)) as Channels
                break
            case 1:
                if(typeof channels == "string") throw new Error(Color.ERROR_CONSTRUCT_MODE)
                this.channels = Color.hsvToRgb([norm(channels[0],{min:0, max:360}),channels[1],channels[2]])
                break
            case 2:
                if(typeof channels != "string") throw new Error(Color.ERROR_CONSTRUCT_MODE)
                if(channels.length != 7)throw new Error(channels + " must take the format #FFFFFF in order to be a valid hexadecimal color value ")
                this.channels = Color.hexToRgb(channels)
                break
            case 3:
                if(typeof channels != "string") throw new Error(Color.ERROR_CONSTRUCT_MODE)
                const hex = Color.cssToHex(channels)
                if(!hex)throw new Error(channels + " is not a valid css color name")
                this.channels = Color.hexToRgb(hex)
                this.name = channels
                break
        }
        this.name = Color.rgbToCss(this.channels)
        this.alpha = bound(alpha)
    }

    /**
     * get rgb representation
     */
    get rgb():Channels{
        return this.channels.map(c=>Math.floor(255*c)) as Channels
    }

    /**
     * get alpha channel
     */
    get a():number{
        return this.alpha
    }

    /**
     * get hsv representation
     */
    get hsv(){
        let hsv = Color.rgbToHsv(this.channels)
        hsv[0]*360
        return hsv
    }

    /**
     * get hexadecimal representation
    */
    get hex(){
        return Color.rgbToHex(this.channels)
    }

    /**
    * get css word representation
    */
    get css(){
        return this.name?this.name:this.hex
    }

    /**
     * map a RGB color to its word representation
     * @param rgb  [red, green, blue] noramilsed only
     * @returns string: css color word
     */
    static rgbToCss(rgb:Channels){
        return Color.hexToCss(Color.rgbToHex(rgb))
    }

    /**
     * map a RGB color to its word representation
     * @param rgb  [red, green, blue] noramilsed only
     * @returns string: css color word
     */
    static hexToCss(hex:string, isNormal = true){
        for(let [k, v] of Object.entries(colourNames)){
            if(v==hex) return k
        }
        return ""
        
    }

    /**
     * map a css color to its hex representation
     * @param name string: css color word
     * @returns string: hexademical color
     */
    static cssToHex(name:string){
        return colourNames[name]
    }

    /**
     * map a hex color to its rgb representation 
     * @param hex string: hexademical color
     * @param isNormal boolean: true if range is 0-1 else 0-255
     * @returns [red, green, blue]: numbers 
     */
    static hexToRgb(hex:string, isNormal = true): Channels{
        let rgb = [0,0,0]
        let scale = isNormal?255:1
        rgb.forEach((c,i)=>{
            const cString = hex.substring(2*i+1,2*i+4)
            rgb[i] = parseInt(cString)/scale
        })
        return rgb as Channels
    }

    static rgbToHex(rgb:Channels, isNormal = true):string{
        const channels = isNormal?rgb.map(c=>Math.floor(255*c)):rgb
         return channels.reduce((s,c)=>{
            const cString  = c.toString(16).padStart(2,"0")
            return s + cString 
        },"#")

    }

    /**
     * map a RGB color to its HSV representation
     * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
     * @param rgb [red, green, blue]: numbers 
     * @param isNormal boolean: true if i/o range is 0-1 else 0-255
     * @returns [hue, sat, value]: numbers in range 0-1
     */
    static rgbToHsv(rgb:Channels, isNormal = true):Channels{
        const domain = isNormal?{min:0,max:1}:{min:0, max:255}
        const channels = rgb.map(c=>norm(c, domain))
        const max = Math.max(...rgb)
        const min = Math.min(...rgb)
        const c = max-min
        const s = max?(c/max):0
        let h = 0
        if(c){
            while(rgb[h]!=max)h++
            const x = (h+1)%3-(h+2)%3
            h = (h*2+x/min)*(isNormal?1/6:60)
        }

        return [h,s,max]


    }

    /**
     * map a HSV color to its RGB representation
     * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
     * @param hsv [hue, sat, value]: numbers
     * @param isNormal boolean: true if i/o range is [0-1, 0-1, 0-1] else [0-360, 0-1, 0-1]
     * @returns [red, green, blue]: numbers in range 0-1
     */

    static hsvToRgb(hsv:Channels, isNormal = true):Channels{
        let h = isNormal?hsv[0] * 6:hsv[0] / 60
        let s = hsv[1]
        let v = hsv[2]

        const c = v * s
        const x = c * (1 - Math.abs(h % 2 - 1))
        const m = v - c;

        let rgb = [x+m, c+m, m]

        if(Math.floor(h) % 2)rgb = [c+m, x+m, m]
        if(h> 2)rgb.unshift(rgb.pop() as number);
        if(h > 4)rgb.unshift(rgb.pop() as number);
        
        const scale = isNormal?1:255
        return [rgb[0]*scale,rgb[1]*scale,rgb[2]*scale];

    }


    
}