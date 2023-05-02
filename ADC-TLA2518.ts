namespace JoyPiAdvanced {
    const ADCPIN = DigitalPin.P16
    const SYSTEMSTATUS = 0x00
    const READCMD = 0x10
    const WRITECMD = 0x08
    const PINCFG = 0x05
    const CHANNELSEL = 0x11
  
    function readRegister(register: number): number {
      pins.digitalWritePin(ADCPIN, 0)
      pins.spiWrite(READCMD)
      pins.spiWrite(register)
      pins.spiWrite(READCMD)
      pins.digitalWritePin(ADCPIN, 1)
      pins.digitalWritePin(ADCPIN, 0)
      let returnValue = pins.spiWrite(READCMD)
      pins.digitalWritePin(ADCPIN, 1)
      return returnValue
  
    }
  
    function writeRegister(register: number, data: number): number {
      // 24-Bit SPI frame for writing data
      pins.digitalWritePin(ADCPIN, 0)
      // Send 8-Bit write command
      pins.spiWrite(WRITECMD)
      // Send 8-Bit register address
      pins.spiWrite(register)
      // Send 8-Bit data
      let returnValue = pins.spiWrite(data)
      pins.digitalWritePin(ADCPIN, 1)
      return returnValue
    }
  
    function read(channel: number): number {
      writeRegister(CHANNELSEL, channel)
      let data = readRegister(READCMD)
      writeRegister(READCMD, (data & 0xFC))
      writeRegister(PINCFG, READCMD)
      writeRegister(READCMD, READCMD)
      pins.digitalWritePin(ADCPIN, 0)
      let byteOne = pins.spiWrite(SYSTEMSTATUS)
      let byteTwo = pins.spiWrite(SYSTEMSTATUS)
      pins.digitalWritePin(ADCPIN, 1)
  
      let returnValue = ((byteOne << 8) | byteTwo) >> 4
      return returnValue
  
    }
  
    /**
     * Reads the value of the analog digital converter on a specified channel
     * @param channel specifies the channel which is supposed to be read
     */
    //% block="ADC value on channel %channel"
    //% subcategory="Analog-Digital Converter"
    //% channel.min=0 channel.max=7
    //% weight=100
    export function adcReadValue(channel: number): number {
      return read(channel)
    }
  
    /**
     * Reads a channel on the analog digital converter and converts the value to a voltage number
     * @param channel specifies the channel which is supposed to be read
     */
    //% block="ADC voltage on channel %channel"
    //% subcategory="Analog-Digital Converter"
    //% channel.min=0 channel.max=7
    //% weight=90
    export function adcReadVoltage(channel: number): number {
      let tempValue = 0
      while(tempValue == 0){
        tempValue = adcReadValue(channel)
      }

      return (tempValue * 5.00/4096.0)
    }
  
  }
  