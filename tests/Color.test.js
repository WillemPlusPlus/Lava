import {Color} from "../dst/modules/Color"



test("new Color from css", () => {
    let c = new Color("darkorange")
    expect(c.a).toBe(1)
    expect(c.rgb).toStrictEqual([255,140,0])
    expect(c.name).toBe("darkorange")
})


test("new Color from hex", () => {
    let c = new Color("#ff8c00")
    expect(c.a).toBe(1)
    expect(c.rgb).toStrictEqual([255,140,0])
    expect(c.name).toBe("darkorange")
})

test("new Color from rgb", () => {
    let c = new Color([255,140,0])
    expect(c.a).toBe(1)
    expect(c.rgb).toStrictEqual([255,140,0])
    expect(c.name).toBe("darkorange")
})

test("new Color from hsv", () => {
    let c = new Color([33,100,100],1)
    expect(c.a).toBe(1)
    expect(c.rgb).toStrictEqual([255,140,0])
    expect(c.name).toBe("darkorange")
})