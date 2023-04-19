/**
  * LDR Block
  */
//% color="#275C6B" weight=86 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
    //% block="Measure ambient light in percent"
    //% subcategory="LDR"
    //% weight=100
    export function ldrLight(): number {
      let rawLDR = readVoltage(5)
      let light = pins.map(rawLDR, 0, 4.5, 0, 100)
      light = Math.round(light * 100) / 100
      return light
    }
  
  }
  