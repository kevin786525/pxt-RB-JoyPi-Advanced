
/**
  * Ultrasonic distance sensor Block
  */
//% color="#275C6B" weight=67 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    const echoPin = DigitalPin.P2
    const triggerPin = DigitalPin.P3
  
    /*
     * Measure distance with ultrasonic sensor
     */
    //% block="Measure distance"
    //% subcategory="Ultrasonic sensor"
    //% weight=100
    export function measureDistance(): number {
      // Measure distance with 10us trigger signal
      led.enable(false)
      pins.digitalWritePin(triggerPin, 1)
      control.waitMicros(10)
      pins.digitalWritePin(triggerPin, 0)
  
      // Wait on echo input for signal
      let duration = pins.pulseIn(echoPin, PulseValue.High)
      return (duration / 58.2)
    }
  }
  