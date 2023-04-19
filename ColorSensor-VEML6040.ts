

/**
  * VEML6040 Block
*/
//% color="#275C6B" weight=95 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    // Address
    const colorsensorADDR = 0x10
    // Channels
    const redChannel = 0x08
    const greenChannel = 0x09
    const blueChannel = 0x0A
    const whiteChannel = 0x0B

    //% block="Initialize VEML6040"
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

    //% block="Read red value"
    //% subcategory="Color-Sensor"
    //% weight=95
    export function colroSensorGetRed(): number {
        pins.i2cWriteNumber(colorsensorADDR, redChannel, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }

    //% block="Read green value"
    //% subcategory="Color-Sensor"
    //% weight=90
    export function colorSensorGetGreen(): number {
        pins.i2cWriteNumber(colorsensorADDR, greenChannel, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }

    //% block="Read blue value"
    //% subcategory="Color-Sensor"
    //% weight=85
    export function colorSensorGetBlue(): number {
        pins.i2cWriteNumber(colorsensorADDR, blueChannel, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }

    //% block="Read white value"
    //% subcategory="Color-Sensor"
    //% weight=80
    export function colorSensorGetWhite(): number {
        pins.i2cWriteNumber(colorsensorADDR, whiteChannel, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }

}
