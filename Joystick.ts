/**
  * Joystick Block
  */
//% color="#275C6B" weight=88 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    const joystickButtonPin = DigitalPin.P10
  
    //% block="Get X Value"
    //% subcategory="Joystick"
    //% weight=100
    export function joystickGetXValue(): number {
      return readValue(0)
    }
  
    //% block="Get Y Value"
    //% subcategory="Joystick"
    //% weight=90
    export function joystickGetYValue(): number {
      return readValue(1)
    }
  
    //% block="Check button"
    //% subcategory="Joystick"
    //% weight=80
    export function joystickCheckButton(): boolean {
      led.enable(false)
      if(!pins.digitalReadPin(joystickButtonPin)){
        return true
      }
      else {
        return false
      }
    }
  }
  