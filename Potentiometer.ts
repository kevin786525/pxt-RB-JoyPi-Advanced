namespace JoyPiAdvanced {

   /**
    * Measures the current state of the potentiometer as a voltage. A higher voltage means that the potentiometer is positioned further to the right
    */
    //% block="potentiometer voltage"
    //% subcategory="Potentiometer"
    //% weight=100
    export function potentiometerVoltage(): number {
      return adcReadVoltage(3)
    }
  
  }
  