  namespace JoyPiAdvanced {
    enum SWselection {
      //% block="Switch1"
      switch1,
      //%block="Switch2"
      switch2,
      //%block="Switch3"
      switch3,
      //%block="Switch4"
      switch4,
      //%block="Switch5"
      switch5
    }

    const sw1 = DigitalPin.P2
    const sw2 = DigitalPin.P3
    const sw3 = DigitalPin.P4
    const sw4 = DigitalPin.P5
    const sw5 = DigitalPin.P6
  
    /**
     * Checks the current state of a switch. True means that the switch is set to ON. False means that the switch is set to OFF.
     * @param JoyPiSwitch The switch which is supposed to be checked
     */
    //% block="check switch %switch"
    //% subcategory="Switches"
    //% weight=100
    export function switchCheck(JoyPiSwitch: SWselection): boolean {
      let selection  
  
      if(JoyPiSwitch == SWselection.switch1) {
        selection = sw1
      }
      else if(JoyPiSwitch == SWselection.switch2) {
        selection = sw2
        led.enable(false)
      }
      else if(JoyPiSwitch == SWselection.switch3) {
        selection = sw3
        led.enable(false)
      }
      else if(JoyPiSwitch == SWselection.switch4) {
        selection = sw4
      }
      else if(JoyPiSwitch == SWselection.switch5) {
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
  