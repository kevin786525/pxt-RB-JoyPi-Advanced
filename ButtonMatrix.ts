namespace JoyPiAdvanced  {
    let i2c_address: number
    let row1: boolean
    let row2: boolean
    let row3: boolean
    let row4: boolean
    let column1: boolean
    let column2: boolean
    let column3: boolean
    let column4: boolean

    i2c_address = 0x22

    function readGPIO() {
        let gpio = pins.createBuffer(1)
        gpio.setNumber(NumberFormat.Int8LE, 0, 0x09)
        pins.i2cWriteBuffer(i2c_address, gpio, false)
        return pins.i2cReadNumber(i2c_address, NumberFormat.Int8LE)
    }

    function checkMatrix() {
        let column_value = readGPIO()

        if (column_value == 14) column1 = true
        else if (column_value == 13) column2 = true
        else if (column_value == 11) column3 = true
        else if (column_value == 7) column4 = true
        else return false

        let rows = pins.createBuffer(2)
        rows.setNumber(NumberFormat.Int8LE, 0, 0x09)
        rows.setNumber(NumberFormat.Int8LE, 1, 0x80)
        pins.i2cWriteBuffer(i2c_address, rows, false)
        let row_value = readGPIO() & 0xFF
        if (row_value == 0x8F)row4 = true

        rows.setNumber(NumberFormat.Int8LE, 0, 0x09)
        rows.setNumber(NumberFormat.Int8LE, 1, 0x40)
        pins.i2cWriteBuffer(i2c_address, rows, false)
        row_value = readGPIO() & 0xFF
        if (row_value == 0x4F) row3 = true

        rows.setNumber(NumberFormat.Int8LE, 0, 0x09)
        rows.setNumber(NumberFormat.Int8LE, 1, 0x20)
        pins.i2cWriteBuffer(i2c_address, rows, false)
        row_value = readGPIO() & 0xFF
        if (row_value == 0x2F) row2 = true

        rows.setNumber(NumberFormat.Int8LE, 0, 0x09)
        rows.setNumber(NumberFormat.Int8LE, 1, 0x10)
        pins.i2cWriteBuffer(i2c_address, rows, false)
        row_value = readGPIO()
        if (row_value == 0x1F) row1 = true

        if (row1 == false && row2 == false && row3 == false && row4 == false) return false
            
        return true
    }

    function buttonmatrixCleanup() {
        column1 = false
        column2 = false
        column3 = false
        column4 = false
        row1 = false
        row2 = false
        row3 = false
        row4 = false

        let reset = pins.createBuffer(2)

        reset.setNumber(NumberFormat.Int8LE, 0, 0x00)
        reset.setNumber(NumberFormat.Int8LE, 1, 0x0F)
        pins.i2cWriteBuffer(i2c_address, reset, false)

        reset.setNumber(NumberFormat.Int8LE, 0, 0x09)
        reset.setNumber(NumberFormat.Int8LE, 1, 0x00)
        pins.i2cWriteBuffer(i2c_address, reset, false)

        reset.setNumber(NumberFormat.Int8LE, 0, 0x06)
        reset.setNumber(NumberFormat.Int8LE, 1, 0x0F)
        pins.i2cWriteBuffer(i2c_address, reset, false)
    }

    /**
     * Initialized the button matrix
     */
    //% block="initialize button matrix"
    //% weight=100
    //% subcategory="Button matrix"
    export function buttonmatrixInit() {
        let buffer = pins.createBuffer(11);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xFF)
        buffer.setNumber(NumberFormat.Int8LE, 2, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 3, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 4, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 5, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 6, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 7, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 8, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 9, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 10, 0x00)
        pins.i2cWriteBuffer(i2c_address, buffer, false)

        let setup = pins.createBuffer(2)

        setup.setNumber(NumberFormat.Int8LE, 0, 0x00)
        setup.setNumber(NumberFormat.Int8LE, 1, 0x0F)
        pins.i2cWriteBuffer(i2c_address, setup, false)

        setup.setNumber(NumberFormat.Int8LE, 0, 0x09)
        setup.setNumber(NumberFormat.Int8LE, 1, 0x00)
        pins.i2cWriteBuffer(i2c_address, setup, false)

        setup.setNumber(NumberFormat.Int8LE, 0, 0x06)
        setup.setNumber(NumberFormat.Int8LE, 1, 0x0F)
        pins.i2cWriteBuffer(i2c_address, setup, false)

        basic.pause(1)
    }

    /**
     * Returns the the button-code if a button on the matrix is pressed
     */
    //% block="Button pressed on button matrix"
    //% weight=70
    //% subcategory="Button matrix"
    export function buttonmatrixPressed() {
        let returnValue = -1
        if (checkMatrix() == false) return -1
        else {
            control.waitMicros(250000)
            if (column1) {
                if (row1) returnValue = 11
                if (row2) returnValue = 12
                if (row3) returnValue = 13
                if (row4) returnValue = 14
            }
            else if (column2) {
                if (row1) returnValue = 21
                if (row2) returnValue = 22
                if (row3) returnValue = 23
                if (row4) returnValue = 24
            }
            else if (column3) {
                if (row1) returnValue = 31
                if (row2) returnValue = 32
                if (row3) returnValue = 33
                if (row4) returnValue = 34
            }
            else if (column4) {
                if (row1) returnValue = 41
                if (row2) returnValue = 42
                if (row3)  returnValue = 43
                if (row4) returnValue = 44
            }
        }
        buttonmatrixCleanup()
        return returnValue
    }

    /**
     * Returns the exact value if a button on the matrix is pressed
     */
    //% block="value of pressed button on button matrix"
    //% weight=60
    //% subcategory="Button matrix"
    export function buttonmatrixPressedValue() {
        let value = buttonmatrixPressed()
        if(value == 11) return "7"
        if (value == 12) return "4"
        if (value == 13) return "1"
        if (value == 14) return "0"
        if (value == 21) return "8"
        if (value == 22) return "5"
        if (value == 23) return "2"
        if (value == 24) return "#"
        if (value == 31) return "9"
        if (value == 32) return "6"
        if (value == 33) return "3"
        if (value == 34) return "="
        if (value == 41) return "*"
        if (value == 42) return "/"
        if (value == 43) return "+"
        if (value == 44) return "-"

        return -1
    }
}
