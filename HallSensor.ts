namespace JoyPiAdvanced {

  /**
   * Measures the voltage of the hall sensor. A higher value means a higher amplitude
   */
    //% block="hall sensor voltage"
    //% subcategory="Hall sensor"
    //% weight=100
    export function hallSensorVoltage(): number {
      return adcReadVoltage(5)
    }
  
  }
  