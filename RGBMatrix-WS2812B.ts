namespace JoyPiAdvanced {
    const RGBMATRIXADDR = DigitalPin.P2

    let brightness: number
    let length: number = 64
    let width: number = 8
    let buffer: Buffer = pins.createBuffer(192)
    let mapping: number[][] = []

    let sins = [0];

    function clear() {
        buffer.fill(0, 0, length * 3)
    }

    function write(offset: number, r: number, g: number, b: number) {
        buffer[offset] = g
        buffer[offset + 1] = r
        buffer[offset + 2] = b
    }

    function show() {
        ws2812b.sendBuffer(buffer, RGBMATRIXADDR)
    }

    function matrixInit() {
        sins = [
            127, 129, 131, 134, 136, 138, 140, 143, 145, 147, 149, 151, 154, 156, 158, 160, 162, 164, 166, 169, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 193, 195, 196, 198, 200,
            202, 204, 205, 207, 209, 211, 212, 214, 216, 217, 219, 220, 222, 223, 225, 226, 227, 229, 230, 231, 233, 234, 235, 236, 237, 239, 240, 241, 242, 243, 243, 244, 245, 246, 247, 248,
            248, 249, 250, 250, 251, 251, 252, 252, 253, 253, 253, 254, 254, 254, 254, 254, 254, 254, 255, 254, 254, 254, 254, 254, 254, 254, 253, 253, 253, 252, 252, 251, 251, 250, 250, 249,
            248, 248, 247, 246, 245, 244, 243, 243, 242, 241, 240, 239, 237, 236, 235, 234, 233, 231, 230, 229, 227, 226, 225, 223, 222, 220, 219, 217, 216, 214, 212, 211, 209, 207, 205, 204,
            202, 200, 198, 196, 195, 193, 191, 189, 187, 185, 183, 181, 179, 177, 175, 173, 171, 169, 166, 164, 162, 160, 158, 156, 154, 151, 149, 147, 145, 143, 140, 138, 136, 134, 131, 129,
            127, 125, 123, 120, 118, 116, 114, 111, 109, 107, 105, 103, 100, 98, 96, 94, 92, 90, 88, 85, 83, 81, 79, 77, 75, 73, 71, 69, 67, 65, 63, 61, 59, 58, 56, 54,
            52, 50, 49, 47, 45, 43, 42, 40, 38, 37, 35, 34, 32, 31, 29, 28, 27, 25, 24, 23, 21, 20, 19, 18, 17, 15, 14, 13, 12, 11, 11, 10, 9, 8, 7, 6,
            6, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5,
            6, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23, 24, 25, 27, 28, 29, 31, 32, 34, 35, 37, 38, 40, 42, 43, 45, 47, 49, 50,
            52, 54, 56, 58, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 88, 90, 92, 94, 96, 98, 100, 103, 105, 107, 109, 111, 114, 116, 118, 120, 123, 125
        ];

        pins.digitalWritePin(RGBMATRIXADDR, 0)
        brightness = 0x80

        let len = 0
        for (let i = 0; i < width; i++) {
            mapping[i] = []
            for (let j = 0; j < width; j++) {
                mapping[i][j] = len
                len++
            }
        }
    }

    /**
     * Sets the whole RGB matrix to a specific color
     * @param r Red value from 0 (no brightness of the red base color) to 255 (full brightness of the red base color)
     * @param g Green value from 0 (no brightness of the green base color) to 255 (full brightness of the green base color)
     * @param b Blue value from 0 (no brightness of the blue base color) to 255 (full brightness of the blue base color)
     */
    //% block="set RGB Matrix to color R: %red G: %green B: %blue"
    //% subcategory="RGB Matrix"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% weight=80
    export function matrixShowColor(r: number, g: number, b: number) {
        matrixInit()
        if (brightness < 255) {
            r = (r * brightness) >> 8
            g = (g * brightness) >> 8
            b = (b * brightness) >> 8
        }

        for (let k = 0; k < length; k++) {
            write(k * 3, r, g, b)
        }
        show()
    }

    /**
     * Sets a single pixel to a specific color
     * @param x X position on the matrix
     * @param y Y position on the matrix
     * @param r Red value from 0 (no brightness of the red base color) to 255 (full brightness of the red base color)
     * @param g Green value from 0 (no brightness of the green base color) to 255 (full brightness of the green base color)
     * @param b Blue value from 0 (no brightness of the blue base color) to 255 (full brightness of the blue base color)
     */
    //% block="set single pixel on RGB matrix on position x: %x y: %y to color: R: %r G: %g B: %b"
    //% subcategory="RGB Matrix"
    //% weight=70
    export function matrixSetPixel(x: number, y: number, r: number, g: number, b: number) {
        matrixInit()
        if (brightness < 255) {
            r = (r * brightness) >> 8
            g = (g * brightness) >> 8
            b = (b * brightness) >> 8
        }

        let position = mapping[y][x]

        write(position * 3, r, g, b)
        show()

    }

    /**
     * Activates a rainbow cycle on the RGB matrix
     */
    //% block="activate RGB matrix rainbow mode"
    //% subcategory="RGB Matrix"
    //% weight=60
    export function matrixRainbow(): void {
        let r = 255;
        let g = 0;
        let b = 0;

        for(let i = 0 ; i < 360 ; i+=7){
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    r = sins[i]
                    g = sins[(i + 120) % 360]
                    b = sins[(i + 240) % 360]
                    JoyPiAdvanced.matrixSetPixel(x, y, r, g, b)
                }
            }
        }
    }

    /**
     * Clears all outputs on the RGB martrix
     */
    //% block="clear rgb matrix"
    //% subcategory="RGB Matrix"
    //% weight=50
    export function matrixClear() {
        matrixInit()
        clear()
        show()
    }
}
