enum stepUnit {
    //% block="steps"
    Steps,
    //% block="rotations"
    Rotations
  }

enum stepperdirection {
  //% block="Clockwise"
  Clockwise,
  //% block="Counterclockwise"
  Counterclockwise
}
  
  /**
    * Stepper motor Block
    */
  //% color="#275C6B" weight=71 icon="\uf109" block="JoyPi Advanced"
  namespace JoyPiAdvanced {
    const STEPPERPIN1 = DigitalPin.P4
    const STEPPERPIN2 = DigitalPin.P5
    const STEPPERPIN3 = DigitalPin.P6
    const STEPPERPIN4 = DigitalPin.P7
  
    let state = 0
  
    function moveStep(direction: number) {
      if (state == 0) {
        pins.digitalWritePin(STEPPERPIN1, 0)
        pins.digitalWritePin(STEPPERPIN2, 0)
        pins.digitalWritePin(STEPPERPIN3, 0)
        pins.digitalWritePin(STEPPERPIN4, 0)
      }
      else if (state == 1) {
        pins.digitalWritePin(STEPPERPIN1, 1)
        pins.digitalWritePin(STEPPERPIN2, 0)
        pins.digitalWritePin(STEPPERPIN3, 0)
        pins.digitalWritePin(STEPPERPIN4, 1)
      }
      else if (state == 2) {
        pins.digitalWritePin(STEPPERPIN1, 0)
        pins.digitalWritePin(STEPPERPIN2, 0)
        pins.digitalWritePin(STEPPERPIN3, 1)
        pins.digitalWritePin(STEPPERPIN4, 1)
      }
      else if (state == 3) {
        pins.digitalWritePin(STEPPERPIN1, 0)
        pins.digitalWritePin(STEPPERPIN2, 1)
        pins.digitalWritePin(STEPPERPIN3, 1)
        pins.digitalWritePin(STEPPERPIN4, 0)
      }
      else if (state == 4) {
        pins.digitalWritePin(STEPPERPIN1, 1)
        pins.digitalWritePin(STEPPERPIN2, 1)
        pins.digitalWritePin(STEPPERPIN3, 0)
        pins.digitalWritePin(STEPPERPIN4, 0)
      }
  
      state = state + direction
      if (state < 1) {
        state = 4
      }
      else if (state > 4) {
        state = 1
      }
    }
  
  
    //% block="Rotate stepper %stepperdirection for %steps | %unit"
    //% subcategory="Stepper motor"
    //% weight=100
    export function stepperRotate(direction: stepperdirection, steps: number, unit: stepUnit): void {
      switch(unit) {
        case stepUnit.Rotations: steps = steps * 2056
        case stepUnit.Steps: steps = steps
      }
  
      for(let i = 0 ; i < steps ; i++) {
        if(direction == stepperdirection.Clockwise){
          moveStep(1)
          basic.pause(1)
        }
        else {
          moveStep(-1)
          basic.pause(1)
        }

      }
  
      state = 0
    }
  
  }
  