namespace JoyPiAdvanced {
  const pirPin = DigitalPin.P6;

  /**
   * Returns the current state of the PIR sensor. True means that a motion is detected. False means that no motion is detected.
   */
  //% block="Check PIR motion"
  //% subcategory="PIR Sensor"
  //% weight=100
  export function pirCheckMotion(){
    // Disable LED Pin 6 to enable use for PIR sensor
    led.enable(false)
    // Check for HIGH signal
    if (pins.digitalReadPin(pirPin)) {
      return true;
    }
    else {
      return false;
    }
  }

}
