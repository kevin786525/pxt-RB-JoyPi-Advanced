/**
  * MS5607 Barometer Block
  */
//% color="#275C6B" weight=98 icon="\uf109" block="JoyPi Advanced"

namespace  JoyPiAdvanced{
    const barometerADDR = 0x77
    let coefficients: number[] = []
    let d1: number
    let d2: number
    let dT: number
    let p: number
    let temp: number

    function resetMS5607() {
        pins.i2cWriteNumber(barometerADDR, 0x1E, NumberFormat.Int8LE)
        d1 = 0
        d2 = 0
        dT = 0
        p = 0
        temp = 0
    }

    function read_coefficient(num: number) {
        let coef = pins.createBuffer(1)
        let temp = (0xA0 + (num * 2))
        coef.setNumber(NumberFormat.Int8LE, 0, temp)
        pins.i2cWriteBuffer(barometerADDR, coef, false)

        let result = pins.i2cReadBuffer(barometerADDR, 2)
        let result1 = result.getNumber(NumberFormat.UInt8LE, 0)
        let result2 = result.getNumber(NumberFormat.UInt8LE, 1)
        let result_coef = (256 * result1) + result2
        serial.writeLine("")
        return result_coef
    }

    function get_coefficients() {
        let cx: number[] = []

        for (let i = 0; i < 6; i++) {
            cx[i] = read_coefficient((i + 1))
            if (cx[i] == 0) cx[i] = read_coefficient((i + 1))
        }
        return cx
    }

    function conversion(adc: number, data: number) {
        let delay: number
        if (adc == 0x00) delay = 1
        if (adc == 0x02) delay = 3
        if (adc == 0x04) delay = 4
        if (adc == 0x06) delay = 6
        if (adc == 0x08) delay = 10

        let con = pins.createBuffer(1)
        con.setNumber(NumberFormat.Int8LE, 0, (0x40 | data))
        pins.i2cWriteBuffer(barometerADDR, con, false)

        basic.pause(delay)

        con.setNumber(NumberFormat.Int8LE, 0, 0)
        pins.i2cWriteBuffer(barometerADDR, con, false)
        let conver = pins.i2cReadBuffer(barometerADDR, 3)
        let value = (65536 * conver.getNumber(NumberFormat.UInt8LE, 0)) + (256 * conver.getNumber(NumberFormat.UInt8LE, 1)) + conver.getNumber(NumberFormat.UInt8LE, 2)
        return value
    }

    function get_pressure() {
        d1 = conversion(0x08, 0x00)
        d2 = conversion(0x08, 0x10)
        dT = d2 - (coefficients[4] * 256)
        let off = coefficients[1] * 131072 + (coefficients[3] * dT) / 64
        let sens = coefficients[0] * 65536 + (coefficients[2] * dT) / 128
        p = (d1 * sens / 2097152 - off) / 32768

        return p
    }


    function get_temperature() {
        d2 = conversion(0x08, 0x10)
        dT = d2 - (coefficients[4] * 256)
        temp = 2000 + dT * (coefficients[5] / 8388608)
        return temp
    }

    //% block="Initialize barometer"
    //% weight=100
    //% subcategory="Barometer"
    export function barometerInit(): void {
        resetMS5607()
        coefficients = get_coefficients()
    }

    //% block="Get temperature"
    //% weight=90
    //% subcategory="Barometer"
    export function barometerGetTemperature() {
        return Math.round(((get_temperature() / 100) + Number.EPSILON) * 100) / 100
    }

    //% block="Get pressure"
    //% weight=80
    //% subcategory="Barometer"
    export function barometerGetPressure() {
        return Math.round(((get_pressure() / 100) + Number.EPSILON) * 100) / 100
    }

    //% block="Get altitude with %sr and %qnh"
    //% weight=70
    //% subcategory="Barometer"
    /*export function get_altitude(samples: number = 48, qnh: number = 1013.25){
        let accumulated = 0
        for(let i = 0; i < samples; i++){
            basic.pause(1)
            accumulated += get_pressure()
        }
        let average = accumulated / samples
        return calculate_altitude(average, qnh)
    }*/

    /*function calculate_altitude(pressure: number, qnh : number){
        return 44330 * (1 - Math.pow((pressure / 100) / qnh, 1 / 5.257))
        //((287.058 * ((get_temperature() / 100) + 273.15)) / 9, 80665) * Math.log(pressure / qnh)
        // 44330 * (1.0 - Math.pow(pressure / qnh, 0.1903))
        // (Math.pow(qnh / pressure, 1/5.257)-1)*(temperature_in_celsius()+273.15) / 0.0065
    }*/
}
