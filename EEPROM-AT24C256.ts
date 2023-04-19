/**
  * EEPROM Block
  */
//% color="#275C6B" weight=92 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    let eepromADDR = 0x50;

    //% block="Write %dat to EEPROM address %addr"
    //% subcategory="EEPROM"
    //% weight=100
    export function eeepromWrite(data: number, address: number): void {
        let buf = pins.createBuffer(3);

        buf[0] = address >> 8;
        buf[1] = (address & 0xFF);
        buf[2] = data;
        pins.i2cWriteBuffer(eepromADDR, buf)
    }

    //% block="Read byte from EEPROM address %addr"
    //% subcategory="EEPROM"
    //% weight=99
    export function eepromRead(address: number): number {
        pins.i2cWriteNumber(eepromADDR, address, NumberFormat.UInt16BE);
        return pins.i2cReadNumber(eepromADDR, NumberFormat.UInt8BE);
    }


}