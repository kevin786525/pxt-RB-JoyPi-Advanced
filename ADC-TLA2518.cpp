#include "pxt.h"
#include <SPI.h>

#define ADCPIN P16
#define SYSTEM_STATUS 0x00
#define READ_CMD 0x10
#define WRITE_CMD 0x08
#define CHANNEL_SEL 0x11
#define PIN_CFG 0x05
#define SEQUENCE_CFG 0x10

using namespace pxt;
namespace TLA2518 {

    MicroBitPin *adcPin = &uBit.io.P16;
    SPI spi(ADCPIN);

    uint8_t readRegister(uint8_t reg) {
        adcPin->setDigitalValue(0);
        spi.write(READ_CMD);
        spi.write(reg);
        spi.write(0x00);
        uBit.sleep_us(200);
        adcPin->setDigitalValue(1);
        adcPin->setDigitalValue(0);
        uint8_t returnValue = spi.write(0x00);
        adcPin->setDigitalValue(1);
        uBit.sleep_us(100);
        return returnValue;
    }

    void writeRegister(uint8_t reg, uint8_t data) {
        adcPin->setDigitalValue(0);
        spi.write(WRITE_CMD);
        spi.write(reg);
        spi.write(data);
        uBit.sleep_us(100);
        adcPin->setDigitalValue(1);
    }

    uint8_t read(uint8_t channel) {
        uint8_t data = readRegister(SEQUENCE_CFG);
        writeRegister(SEQUENCE_CFG, data & 0xFC);
        writeRegister(PIN_CFG, 0x00);
        writeRegister(SEQUENCE_CFG, 0x00);
        writeRegister(CHANNEL_SEL, channel);
        adcPin->setDigitalValue(0);
        spi.write(0x00);
        spi.write(0x00);
        adcPin->setDigitalValue(1);
        adcPin->setDigitalValue(0);
        uint8_t dataOne = spi.write(0x00);
        uint8_t dataTwo = spi.write(0x00);
        adcPin->setDigitalValue(1);
        return ((dataOne << 8) | dataTwo) >> 4;
    }

    /*uint8_t adcReadValue(uint8_t channel) {
        return read(channel);
    }*/

    uint8_t ValueZero(){
        return read(0)
    }

    uint8_t ValueOne(){
        return read(1)
    }

    uint8_t ValueTwo(){
        return read(2)
    }

    uint8_t ValueThree(){
        return read(3)
    }

    uint8_t ValueFour(){
        return read(4)
    }

    uint8_t ValueFive(){
        return read(5)
    }

    uint8_t ValueSix(){
        return read(6)
    }

    uint8_t ValueSeven(){
        return read(7)
    }

}