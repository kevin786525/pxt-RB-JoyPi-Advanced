/**
  * Enumeration for motor direction
  */
enum MDirection {
    //% block="Clockwise"
    Clockwise,
    //% block="Counterclockwise"
    Counterclockwise
  }
  
  
  /**
    * Servo motor Block
    */
  //% color="#275C6B" weight=74 icon="\uf109" block="JoyPi Advanced"
  namespace JoyPiAdvanced {
    const pinServo = AnalogPin.P8
  
    function scale (num: number, in_min: number, in_max: number, out_min: number, out_max: number) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }
  
  
    /*
     * Turn motor
     */
    //% block="Turn motor to %degrees degree"
    //% degrees.min=0 degrees.max=180 degrees.defl=90
    //% subcategory="Servo motor"
    //% weight=100
    export function turnMotor(degrees: number) {
        pins.servoWritePin(pinServo, degrees)  
    }
  
    /*
     * Stop motor
     */
    //% block="Stop motor"
    //% subcategory="Servo motor"
    //% weight=90
    export function stopMotor() {
      pins.servoWritePin(pinServo, 90)
    }
  
  }
  