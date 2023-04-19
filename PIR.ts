
/**
  * PIR Sensor Block
  */
//% color="#275C6B" weight=82 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
  const pirPin = DigitalPin.P6;

  /*
   * Function to set up gyroscope
   */
  //% block="Check for motion"
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
