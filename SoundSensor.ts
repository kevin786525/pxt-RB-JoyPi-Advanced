/**
  * Sound Sensor Block
  */
//% color="#275C6B" weight=72 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    const pinSoundSensor = DigitalPin.P9
  
  
    /*
     * Check sound sensor
     */
    //% block="Check sound sensor"
    //% subcategory="Sound sensor"
    //% weight=100
    export function soundsensorCheck(): boolean {
      if(pins.digitalReadPin(pinSoundSensor)) {
        return true
      }
      else {
        return false
      }
    }
  }
  