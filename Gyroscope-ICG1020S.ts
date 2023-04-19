
/**
  * Gyroscope Block
  */
//% color="#275C6B" weight=91 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    let mosiPin = DigitalPin.P15;
    let misoPin = DigitalPin.P14;
    let sclkPin = DigitalPin.P13;
    let gyroscopeCSPin = DigitalPin.P1;
    let scale_gyroscope = 700;
    let scale_range = 46.5;


    function write(register: number, data: number) {
        pins.digitalWritePin(gyroscopeCSPin, 0);
        pins.spiWrite(register & 0x7F);
        pins.spiWrite(data);
        pins.digitalWritePin(gyroscopeCSPin, 1);
    }

    function read(register: number) {
        pins.digitalWritePin(gyroscopeCSPin, 0);
        pins.spiWrite(register | 0x80);
        let data = pins.spiWrite(0);
        pins.digitalWritePin(gyroscopeCSPin, 1);
        return data;
    }

    //% block="Initialize Gyroscope"
    //% weight=100 
    //% subcategory="Gyroscope"
    export function gyroscopeInit() {
        pins.spiFrequency(200000000);
        pins.spiFormat(8, 1);
        pins.spiPins(mosiPin, misoPin, sclkPin);
        let tmp = read(27) & 0x26;
        write(27, 0x18 | tmp);
    }

    //% block="Read temperature"
    //% weight=95
    //% subcategory="Gyroscope"
    export function gyroscopeGetTemperature() {
        let tempH = (read(0x41) << 8);
        let tempL = read(0x42);
        let temp = tempH | tempL;
        return temp / 100;
    }

    //% block="Read X-Axis"
    //% weight=90
    //% subcategory="Gyroscope"
    export function gyroscopeGetX() {
        let xH = (read(0x43) << 8);
        let xL = read(0x44);
        let x = xH | xL;
        if (x / scale_gyroscope > scale_range) {
            return x / scale_gyroscope - (2 * scale_range);
        }
        else {
            return x / scale_gyroscope;
        }
    }

    //% block="Read Y-Axis"
    //% weight=85
    //% subcategory="Gyroscope"
    export function gyroscopeGetY() {
        let yH = (read(0x45) << 8);
        let yL = read(0x46);
        let y = yH | yL;
        if (y / scale_gyroscope > scale_range) {
            return y / scale_gyroscope - (2 * scale_range);
        }
        else {
            return y / scale_gyroscope;
        }
    }

    //% block="Read tilt direction"
    //% weight=80
    //% subcategory="Gyroscope"
    export function gyroscopeGetTilt() {
        let tiltThreshold = 2;
        let y2 = gyroscopeGetY();
        let x2 = gyroscopeGetX();
        if (y2 > tiltThreshold) {
            return 'right';
        }
        else if (y2 < -tiltThreshold) {
            return 'left';
        }
        else if (x2 > tiltThreshold) {
            return 'backward';
        }
        else if (x2 < -tiltThreshold) {
            return 'forward';
        }
        else {
            return null;
        }
    }
}
