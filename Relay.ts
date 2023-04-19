
/**
  * Relay Block
  */
//% color="#275C6B" weight=79 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
  const relayPin = DigitalPin.P1

  /*
   * Turn relay off
   */
  //% block="Turn relay off"
  //% subcategory="Relay"
  //% weight=100
  export function relayOn(){
    pins.digitalWritePin(relayPin, 0)
  }

  /*
   * Turn relay off
   */
  //% block="Turn relay on"
  //% subcategory="Relay"
  //% weight=90
  export function relayOff(){
    pins.digitalWritePin(relayPin, 1)
  }

}
