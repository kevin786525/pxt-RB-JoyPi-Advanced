const enum JoyPiAdvancedDirection {
    //% block="Right"
    clockwise = 2,
    //% block="Left"
    counterclockwise = 4
}

namespace JoyPiAdvanced {
    const rotaryDTPin = DigitalPin.P2;
    const rotaryCLKPin = DigitalPin.P3;
    const rotarySWPin = DigitalPin.P4;
    const KYEventID = 3100;

    let directionIndicator = 1;
    let currentCLK = 0;
    let currentDT = 0;
    let lastCLK = 0;
    let EvCounter = 1;
    let lastPressed = 1;
    let pressedID = 5600;

    // Function to decide the direction in which the Encoder is being turned
    function RotaryEncoder() {
        if (currentCLK != lastCLK) {
            if (currentDT != currentCLK) {
                directionIndicator = 1;
            }
            else {
                directionIndicator = 0;
            }

            EvCounter += 1;
            if (EvCounter % 2 == 0) { // kill every second Event  
                if (directionIndicator == 1) {
                    control.raiseEvent(KYEventID + JoyPiAdvancedDirection .clockwise, JoyPiAdvancedDirection .clockwise);
                }
                else {
                    control.raiseEvent(KYEventID + JoyPiAdvancedDirection .counterclockwise, JoyPiAdvancedDirection .counterclockwise);
                }
            }
            lastCLK = currentCLK;
        }
    }

    /** 
      * Initializes the rotary encoder
      */
    //% block="initialize Rotary Encoder"
    //% subcategory="Rotary Encoder"
    //% weight=100
    export function initializeRotaryEncoder() {
        led.enable(false)

        pins.setPull(rotaryDTPin, PinPullMode.PullUp);
        // Interrupt the code on a rising edge on the rotaryCLKPin to execute the RotaryEncoder() function
        pins.onPulsed(rotaryCLKPin, PulseValue.High, function () {
            currentCLK = 1
            RotaryEncoder()

        })

        // Interrupt the code on a falling edge on the rotaryCLKPin to execute the RotaryEncoder() function
        pins.onPulsed(rotaryCLKPin, PulseValue.Low, function () {
            currentCLK = 0
            RotaryEncoder()

        })

        pins.onPulsed(rotaryDTPin, PulseValue.High, function () {
            currentDT = 1

        })

        // Interrupt the code on a falling edge on the rotaryCLKPin to execute the RotaryEncoder() function
        pins.onPulsed(rotaryDTPin, PulseValue.Low, function () {
            currentDT = 0

        })

    }

     /**
      * Event that is executed as soon as the rotary encoder is turned in the corresponding direction
      * @param JoyPiAdvancedDirection  Direction to be listened to
      */
    //% block="on rotary encoder turned in direction %direction"
    //% subcategory="Rotary Encoder"
    //% weight=100
    export function rotaryEncoderonTurned(direction: JoyPiAdvancedDirection , handler: () => void) {
        control.onEvent(KYEventID + direction, direction, handler);
    }

    /**
     * Event that is executed as soon as the rotary encoder is pressed
     */
    //% block="on rotary encoder pressed"
    //% subcategory="Rotary Encoder"
    //% weight=90
    export function rotaryEncoderonPressEvent(handler: () => void) {
        pins.onPulsed(rotarySWPin, PulseValue.Low, function () {
            handler()
        })
    }

}