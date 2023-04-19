/**
  * DS18B20 Temperature Sensor
  */
//% color="#275C6B" weight=93 icon="\uf109" block="JoyPi Advanced"

namespace JoyPiAdvanced {
    //% shim=DS18B20::Temperature
    export function Temperature(): number {
      return 0
    }

    //% block="Read DS18B20"
    //% subcategory="DS18B20"
    //% weight=100
    export function readDS18B20(): number {
      return Temperature()/10
    }



}
