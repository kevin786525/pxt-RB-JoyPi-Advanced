/**
  * Shock Sensor Block
  */
//% color="#275C6B" weight=73 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    const shockSensorPin = DigitalPin.P10
  
    //% block="Check shock sensor"
    //% subcategory="Shock sensor"
    //% weight=100
    export function shocksensorCheck(): boolean {
      if(pins.digitalReadPin(shockSensorPin)){
        return true
      }
      else {
        return false
      }
    }
  
  }
  