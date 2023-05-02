namespace JoyPiAdvanced {

    /**
     * Measures the ambient temperature with the NTC sensor. The return value is the measured voltage. A higher value means a higher temperature.
     */
    //% block="NTC temperature"
    //% subcategory="NTC"
    //% weight=100
    export function ntcTemperature(): number {
      let rawNTC = adcReadVoltage(2)
      let temperature = ((rawNTC / 5.0) * 10000) / (1 - (rawNTC / 5.0))
      temperature = 1 / ((1 / 298.15) + (1 / 3950.0) * Math.log(temperature / 10000))
      temperature = temperature - 273.15
      temperature = Math.round(temperature * 100) / 100
      return temperature
    }
  
  }
  