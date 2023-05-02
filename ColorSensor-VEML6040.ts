namespace JoyPiAdvanced {
    // Address
    const colorsensorADDR = 0x10
    // Channels
    const redChannel = 0x08
    const greenChannel = 0x09
    const blueChannel = 0x0A
    const whiteChannel = 0x0B

    /**
     * Initializes the color sensor
     */
    //% block="initialize color sensor"
    //% subcategory="Color-Sensor"
    //% weight=100
    export function initColorSensor(): void {
        basic.pause(1500)
        // Send command code, iteration time & enable sensor
        let buffer = pins.createBuffer(4);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x30)
        buffer.setNumber(NumberFormat.Int8LE, 2, 0x00)
        pins.i2cWriteBuffer(colorsensorADDR, buffer, false)
    }

    /**
     * Measures the red color component via the color sensor
     */
    //% block="color sensor red value"
    //% subcategory="Color-Sensor"
    //% weight=95
    export function colorSensorGetRed(): number {
        pins.i2cWriteNumber(colorsensorADDR, redChannel, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }

    /**
     * Measures the green component via the color sensor
     */
    //% block="color sensor green value"
    //% subcategory="Color-Sensor"
    //% weight=90
    export function colorSensorGetGreen(): number {
        pins.i2cWriteNumber(colorsensorADDR, greenChannel, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }

    /**
     * Measures the blue component via the color sensor
     */
    //% block="color sensor blue value"
    //% subcategory="Color-Sensor"
    //% weight=85
    export function colorSensorGetBlue(): number {
        pins.i2cWriteNumber(colorsensorADDR, blueChannel, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }

    /**
     * Measures the white component via the color sensor
     */
    //% block="color sensor white value"
    //% subcategory="Color-Sensor"
    //% weight=80
    export function colorSensorGetWhite(): number {
        pins.i2cWriteNumber(colorsensorADDR, whiteChannel, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }

}
