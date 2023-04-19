/**
  * NTC Block
  */
//% color="#275C6B" weight=84 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {

    //% block="Read temperature"
    //% subcategory="NTC"
    //% weight=100
    export function ntcTemperature(): number {
      let rawNTC = readVoltage(2)
      let temperature = ((rawNTC / 5.0) * 10000) / (1 - (rawNTC / 5.0))
      temperature = 1 / ((1 / 298.15) + (1 / 3950.0) * Math.log(temperature / 10000))
      temperature = temperature - 273.15
      temperature = Math.round(temperature * 100) / 100
      return temperature
    }
  
  }
  