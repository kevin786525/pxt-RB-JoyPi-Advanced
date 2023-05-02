namespace JoyPiAdvanced {
    const shockSensorPin = DigitalPin.P10
  
    /**
     * Reads the current state of the shock sensor. True means that a shock was recognized. False means that no shock was recognized.
     */
    //% block="check shock sensor"
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
  