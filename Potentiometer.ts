/**
  * Potentiometer Block
  */
//% color="#275C6B" weight=81 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {

    //% block="Read potentiometer voltage"
    //% subcategory="Potentiometer"
    //% weight=100
    export function potentiometerVoltage(): number {
      return readVoltage(3)
    }
  
  }
  