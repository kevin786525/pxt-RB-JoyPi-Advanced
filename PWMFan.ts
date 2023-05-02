namespace JoyPiAdvanced {
    const pwmfanPin = AnalogPin.P7
  
    /**
     * Sets the speed of the PWM fan. Please note that the PWM fan needs to be in PWM mode.
     * @param speed The speed in percentage from 0 (off) to 100 (full speed)
     */
    //% block="set fan speed to %speed"
    //% subcategory="PWM Fan"
    //% weight=100
    //% speed.min=0 speed.max=100
    export function pwmSetSpeed(speed: number): void {
      // Map speed from percentage range to pwm range
      let output = pins.map(speed, 0, 100, 0, 1023)
      pins.analogWritePin(pwmfanPin, output)
    }
  
  }
  