/**
  * LCD16x2 Block
  */
//% color="#275C6B" weight=87 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    const i2c_address = 0x21;
    let Backlight: number;
    let RegisterSelect: number;

    function write(data: number) {
        let enabled_value = data | 0x04;
        let send = pins.createBuffer(4);

        send.setNumber(NumberFormat.Int8LE, 0, 0x09);
        send.setNumber(NumberFormat.Int8LE, 1, enabled_value);
        send.setNumber(NumberFormat.Int8LE, 2, data);
        pins.i2cWriteBuffer(i2c_address, send, false);
    }

    function set(data: number) {
        data = (data & 0xF0) >> 1;
        data = data | Backlight | RegisterSelect;
        write(data);
    }

    function command(data: number) {
        RegisterSelect = 0x00;
        set(data);
        set(data << 4);
    }

    function send_data(data: number) {
        RegisterSelect = 0x02;
        set(data);
        set(data << 4);
    }

    //% block="Initialize LCD"
    //% subcategory="LCD16x2"
    //% weight=100
    export function LCD16x2_init() {
        Backlight = 0x80;
        RegisterSelect = 0x00;

        let buffer = pins.createBuffer(2);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xFF);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x06);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x00);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xFD);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xF9);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xF1);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xE1);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xC1);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x81);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x01);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x09);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x00);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        basic.pause(1);

        command(0x33);
        command(0x32);
        command(0x0C);
        command(0x28);
        command(0x06);
        LCD16x2_clear();
    }


    //% block="show String %s|at x %x|y %y"
    //% subcategory="LCD16x2"
    //% weight=90
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function LCD16x2_showText(text: string, x: number, y: number): void {
        let a: number;

        if (y > 0) {
            pause(1)
            a = 0xC0;
        }
        else {
            pause(1)
            a = 0x80;
        }
        a += x;
        command(a);

        for (let i = 0; i < text.length; i++) {
            send_data(text.charCodeAt(i));
        }
    }


    //% block="turn on LCD"
    //% subcategory="LCD16x2"
    //% weight=81
    export function LCD16x2_turnOn(): void {
        command(0x0C);
        LCD16x2_BacklightOn();
    }

    //% block="turn off LCD"
    //% subcategory="LCD16x2"
    //% weight=80
    export function LCD16x2_turnOff(): void {
        command(0x08);
        LCD16x2_BacklightOff();
    }

    //% block="clear LCD"
    //% subcategory="LCD16x2"
    //% weight=85
    export function LCD16x2_clear(): void {
        command(0x01);
    }

    //% block="turn on backlight"
    //% subcategory="LCD16x2"
    //% weight=71
    export function LCD16x2_BacklightOn(): void {
        Backlight = 0x80;
        command(0x00);
    }

    //% block="turn off backlight"
    //% weight=70
    //% subcategory="LCD16x2"
    export function LCD16x2_BacklightOff(): void {
        Backlight = 0x00;
        command(0x00);
    }

    //% block="shift left"
    //% weight=61
    //% subcategory="LCD16x2"
    export function LCD16x2_ShiftLeft(): void {
        command(0x18);
    }

    //% block="shift right"
    //% weight=60
    //% subcategory="LCD16x2"
    export function LCD16x2_ShiftRight(): void {
        command(0x1C);
    }

    //% block="show cursor"
    //% weight=50
    //% subcategory="LCD16x2"
    export function LCD16x2_ShowCursor(): void {
        command(0x0E);
    }

    //% block="blinking Cursor"
    //% weight=40
    //% subcategory="LCD16x2"
    export function LCD16x2_BlinkingCursor(): void {
        command(0x0F);
    }

    //% block="hide cursor"
    //% weight=30
    //% subcategory="LCD16x2"
    export function LCD16x2_HideCursor(): void {
        command(0x0C);
    }

    //% block="sets cursor back"
    //% weight=20
    //% subcategory="LCD16x2"
    export function LCD16x2_ReturnHome(): void {
        command(0x02);
    }
}
