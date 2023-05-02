namespace JoyPiAdvanced {
    const pinSoundSensor = DigitalPin.P9
  
  
    /**
     * Checks the current state of the sound sensor. True means that a sound was detected. False means that no sound was detected.
     */
    //% block="check sound sensor"
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
  