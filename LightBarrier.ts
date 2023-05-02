namespace JoyPiAdvanced {
    const pinLightBarrier = DigitalPin.P0
    let lastState = false
    let counter = 0
    let previousMillis = 0
    // 5 second interval
    let interval = 5
  
    // 20 holes in encoder disc
    let wheel = 20
    // calculate interval for 1 minute
    let calc = 60 / interval
    // interval time in micro seconds
    let usInterval = interval * 1000
    let rpm = 0
  
    function getRPM(): boolean {
      // set pullup for speed sensor
      pins.setPull(pinLightBarrier, PinPullMode.PullUp)

      if (pins.digitalReadPin(pinLightBarrier) && !lastState) {
        lastState = true
        return true
      }
      else if (!pins.digitalReadPin(pinLightBarrier) && lastState){
        lastState = false
      }
      return false
    }
  
  
    /**
     * Checks the current state of the light barrier. True means that the light barrier is triggered. False means that its not triggered.
     */
    //% block="check light barrier"
    //% subcategory="Light barrier"
    //% weight=100
    export function lightBarrierIsTriggered(): boolean {
      // set pullup for speed sensor
      pins.setPull(pinLightBarrier, PinPullMode.PullUp)
      
      if (pins.digitalReadPin(pinLightBarrier)) {
        return true
      }
      else {
        return false
      }
    }
  
    /**
     * Calculates the current RPM at the light barrier. This is usally combined with the stepper motor.
     */
    //% block="light barrier RPM"
    //% subcategory="Light barrier"
    //% weight=90
    export function lightBarrierRPM(): number {
      if(getRPM()){
        counter++
      }
  
      if((input.runningTime() - previousMillis) > usInterval) {
        previousMillis = input.runningTime()
        rpm = ((counter * calc)) / wheel
        counter = 0
      }
  
      return rpm
    }
  
  }
  