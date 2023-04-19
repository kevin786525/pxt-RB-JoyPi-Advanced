/**
  * Hall sensor Block
  */
//% color="#275C6B" weight=90 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {

    //% block="Measure voltage"
    //% subcategory="Hall sensor"
    //% weight=100
    export function hallSensorVoltage(): number {
      return readVoltage(5)
    }
  
  }
  