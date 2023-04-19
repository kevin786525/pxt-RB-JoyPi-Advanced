/**
  * PWM Fan Block
  */
//% color="#275C6B" weight=80 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    const pwmfanPin = AnalogPin.P7
  
    //% block="Set fan speed to %speed"
    //% subcategory="PWM Fan"
    //% weight=100
    //% speed.min=0 speed.max=100
    export function pwmSetSpeed(speed: number): void {
      // Map speed from percentage range to pwm range
      let output = pins.map(speed, 0, 100, 0, 1023)
      pins.analogWritePin(pwmfanPin, output)
    }
  
  }
  