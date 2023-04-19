/**
  * Light barrier Block
  */
//% color="#275C6B" weight=85 icon="\uf109" block="JoyPi Advanced"
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
  
  
    //% block="Check light barrier"
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
  
    //% block="Get RPM"
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
  