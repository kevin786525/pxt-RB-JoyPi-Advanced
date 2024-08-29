namespace JoyPiAdvanced {
    const IRADDR = DigitalPin.P5
    const IR_REPEAT = 256
    const IR_INCOMPLETE = 257
    const IR_DATAGRAM = 258
    const REPEAT_TIMEOUT_MS = 120

    let NEWDATA = 0
    let NEWDATAAVAILABLE = false
    let ADDRBIT = 0
    let CMDBIT = 0
    let HIGHDATA = 0
    let LOWDATA = 0
    let COMMAND = -1
    let TIMEOUT = 0
    let activeCommand = 0

    function appendBitToDatagram(bit: number): number {
        NEWDATA += 1;

        if (NEWDATA <= 8) {
            HIGHDATA = (HIGHDATA << 1) + bit;
        }
        else if (NEWDATA <= 16) {
            HIGHDATA = (HIGHDATA << 1) + bit;
        }
        else if (NEWDATA <= 32) {
            LOWDATA = (LOWDATA << 1) + bit;
        }

        if (NEWDATA === 32) {
            ADDRBIT = HIGHDATA & 0xffff;
            CMDBIT = LOWDATA & 0xffff;
            return IR_DATAGRAM;
        }
        else {
            return IR_INCOMPLETE;
        }
    }

    function decode(markAndSpace: number): number {
        if (markAndSpace < 1600) {
            return appendBitToDatagram(0);
        }
        else if (markAndSpace < 2700) {
            return appendBitToDatagram(1);
        }

        NEWDATA = 0;

        if (markAndSpace < 12500) {
            return IR_REPEAT;
        }
        else if (markAndSpace < 14500) {
            return IR_INCOMPLETE;
        }
        else {
            return IR_INCOMPLETE;
        }
    }

    function enableIrMarkSpaceDetection(pin: DigitalPin) {
        pins.setPull(pin, PinPullMode.PullNone);

        let mark = 0;
        let space = 0;

        pins.onPulsed(pin, PulseValue.Low, () => {
            mark = pins.pulseDuration();
        });

        pins.onPulsed(pin, PulseValue.High, () => {
            space = pins.pulseDuration();
            const status = decode(mark + space);

            if (status !== IR_INCOMPLETE) {
                handleIrEvent(status);
            }
        });
    }

    function handleIrEvent(irEvent: number) {
        if (irEvent === IR_DATAGRAM || irEvent === IR_REPEAT) {
            TIMEOUT = input.runningTime() + REPEAT_TIMEOUT_MS;
        }

        if (irEvent === IR_DATAGRAM) {
            NEWDATAAVAILABLE = true;

            const newCommand = CMDBIT >> 8;
            if (newCommand !== activeCommand) {
                activeCommand = newCommand;
            }
        }
    }

    function notifyIrEvents() {
        if (activeCommand === -1) {
        } else {
            const now = input.runningTime();
            if (now > TIMEOUT) {
                NEWDATA = 0;
                activeCommand = -1;
            }
        }
    }

    function ir_rec_to16BitHex(value: number): string {
        let hex = "";
        for (let pos = 0; pos < 4; pos++) {
            let remainder = value % 16;
            if (remainder < 10) {
                hex = remainder.toString() + hex;
            } else {
                hex = String.fromCharCode(55 + remainder) + hex;
            }
            value = Math.idiv(value, 16);
        }
        return hex;
    }

    /**
     * Initializes the IR receiver
     */
    //% block="initialize IR Receiver"
    //% subcategory="IR Receiver"
    //% weight=100
    export function initIrReceiver(): void {
        led.enable(false)
        enableIrMarkSpaceDetection(IRADDR);
    }

    /**
     * Returns the corresponding code as soon as an IR signal is received by the sensor
     */
    //% block="IR button"
    //% subcategory="IR Receiver"
    //% weight=95
    export function irButton(): number {
        led.enable(false)
        notifyIrEvents()

        if (NEWDATAAVAILABLE) {
            NEWDATAAVAILABLE = false;
            return CMDBIT >> 8;
        }
        else {
            return 0
        }
    }
}
