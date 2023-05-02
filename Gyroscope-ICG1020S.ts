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

    /**
     * Initializsed the gyroscope
     */
    //% block="initialize Gyroscope"
    //% weight=100 
    //% subcategory="Gyroscope"
    export function gyroscopeInit() {
        pins.spiFrequency(200000000);
        pins.spiFormat(8, 1);
        pins.spiPins(mosiPin, misoPin, sclkPin);
        let tmp = read(27) & 0x26;
        write(27, 0x18 | tmp);
    }

    /**
     * Reasds the ambient temperature from the gyroscope
     */
    //% block="gyroscope temperature"
    //% weight=95
    //% subcategory="Gyroscope"
    export function gyroscopeGetTemperature() {
        let tempH = (read(0x41) << 8);
        let tempL = read(0x42);
        let temp = tempH | tempL;
        return temp / 100;
    }

    /**
     * Measures the rotation on the X-axis with the gyroscope
     */
    //% block="gyroscope X-axis"
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

    /**
     * Measures the rotation of the Y-axis with the gyroscope
     */
    //% block="gyroscope Y-axis"
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

    /**
     * Reads the tilt direction of the gyroscope
     */
    //% block="gyroscope tilt direction"
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
