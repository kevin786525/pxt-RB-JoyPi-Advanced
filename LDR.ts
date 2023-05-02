namespace JoyPiAdvanced {
    /**
     * Measures the ambient light with the LDR sensor. The return value is the measured voltage. A higher value means a higher light intensity.
     */
    //% block="LDR ambient light"
    //% subcategory="LDR"
    //% weight=100
    export function ldrLight(): number {
      let rawLDR = adcReadVoltage(5)
      let light = pins.map(rawLDR, 0, 4.5, 0, 100)
      light = Math.round(light * 100) / 100
      return light
    }
  
  }
  