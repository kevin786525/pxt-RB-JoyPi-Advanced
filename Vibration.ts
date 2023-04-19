
/**
  * Vibration Block
  */
//% color="#275C6B" weight=66 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    const vibrationPin = DigitalPin.P16
  
    /*
     * Turn relay off
     */
    //% block="Turn vibration off"
    //% subcategory="Vibration motor"
    //% weight=100
    export function vibrationOff(){
      led.enable(false)
      pins.digitalWritePin(vibrationPin, 0)
    }
  
    /*
     * Turn relay off
     */
    //% block="Turn vibration on"
    //% subcategory="Vibration motor"
    //% weight=90
    export function vibrationOn(){
      led.enable(false)
      pins.digitalWritePin(vibrationPin, 1)
    }
  
  }
  