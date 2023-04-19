enum SWSelection {
    //% block="Switch1"
    Switch1,
    //%block="Switch2"
    Switch2,
    //%block="Switch3"
    Switch3,
    //%block="Switch4"
    Switch4,
    //%block="Switch5"
    Switch5
  }
  
  
  /**
    * Switches Block
    */
  //% color="#275C6B" weight=70 icon="\uf109" block="JoyPi Advanced"
  namespace JoyPiAdvanced {
    const sw1 = DigitalPin.P2
    const sw2 = DigitalPin.P3
    const sw3 = DigitalPin.P4
    const sw4 = DigitalPin.P5
    const sw5 = DigitalPin.P6
  
    /*
     * Check switch
     */
    //% block="Check switch %switch"
    //% subcategory="Switches"
    //% weight=100
    export function SWCheck(JoyPiSwitch: SWSelection): boolean {
      let selection  
  
      if(JoyPiSwitch == SWSelection.Switch1) {
        selection = sw1
      }
      else if(JoyPiSwitch == SWSelection.Switch2) {
        selection = sw2
        led.enable(false)
      }
      else if(JoyPiSwitch == SWSelection.Switch3) {
        selection = sw3
        led.enable(false)
      }
      else if(JoyPiSwitch == SWSelection.Switch4) {
        selection = sw4
      }
      else if(JoyPiSwitch == SWSelection.Switch5) {
        selection = sw5
        led.enable(false)
      }

      pins.setPull(selection, PinPullMode.PullDown)
  
      if(pins.digitalReadPin(selection)){
        return true
      }
      else {
        return false
      }
  
    }
  
  }
  