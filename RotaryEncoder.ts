const enum direction {
    //% block="Right"
    clockwise = 2,
    //% block="Left"
    counterclockwise = 4
}

/**
  * Rotary Encoder block
  */
//% color="#275C6B" weight=76 icon="\uf109" block="JoyPi Advanced"
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
                    control.raiseEvent(KYEventID + direction.clockwise, direction.clockwise);
                }
                else {
                    control.raiseEvent(KYEventID + direction.counterclockwise, direction.counterclockwise);
                }
            }
            lastCLK = currentCLK;
        }
    }

    /*
  * Function to initialize the Rotary Encoder
  */
    //% block="Initialize Rotary Encoder"
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

    /*
      * Function to read the Rotary Encoder
      */
    //% block="On encoder turned in direction %direction"
    //% subcategory="Rotary Encoder"
    //% weight=100
    export function onTurned(direction: direction, handler: () => void) {
        control.onEvent(KYEventID + direction, direction, handler);
    }

    /*
     * Function to read the Rotary Encoder
     */
    //% block="On encoder pressed"
    //% subcategory="Rotary Encoder"
    //% weight=90
    export function onPressEvent(handler: () => void) {
        control.onEvent(pressedID, 0, handler);

        // Constantly check the Switch in the background
        control.inBackground(() => {
            while (true) {
                const pressed = pins.digitalReadPin(rotarySWPin);
                if (pressed != lastPressed) {
                    lastPressed = pressed;
                    if (pressed == 0) {
                        control.raiseEvent(pressedID, 0);
                    }
                }
            }
        })
    }

}