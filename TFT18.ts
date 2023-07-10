    /**
      * Colors
      */
    enum JoyPiAdvancedTFTColor {
        //% block="Black"
        black = 0x000F,
        //% block="Navy"
        navy = 0x8000, 
        //% block="DarkGreen"
        darkgreen = 0x0A00,
        //% block="DarkCyan"
        darkcyan = 0x530F,
        //% block="Maroon"
        maroon = 0x3270,
        //% block="Purple"
        purple = 0x906F,
        //% block="Olive"
        olive = 0x030F, 
        //% block="LightGrey"
        lightGrey = 0x330,
        //% block="DarkGrey"
        darkGrey = 0x0007,
        //% block="Blue"
        blue = 0xF00F,
        //% block="Green"
        green = 0x0F0F,
        //% block="Cyan"
        cyan = 0xFF0F,
        //% block="Red"
        red = 0x00FF,
        //% block="Magenta"
        magenta = 0x80FF,
        //% block="Yellow"
        yellow = 0x0FFF,
        //% block="White"
        white = 0xFFFF,
        //% block="Orange"
        orange = 0x02FF,
        //% block="GreenYellow"
        greenyellow = 0x0FCF,
        //% block="Pink"
        pink = 0xF0FF
    }
      
  namespace JoyPiAdvanced {
      // Display commands & constants
      const xOffset = 2;
      const yOffset = 1;

      let TFTWIDTH = 130 + xOffset;
      let TFTHEIGHT = 162 + yOffset;
      const DCPIN = DigitalPin.P0;
      const CSPIN = DigitalPin.P10;
 
      /**
       * TFT Commands
       */
       enum TFTCommands {
           NOP = 0x00,
           SWRESET = 0x01,
           SLPOUT = 0x11,
           NORON = 0x13,
           INVOFF = 0x20,
           DISPOFF = 0x28,
           DISPON = 0x29,
           CASET = 0x2A,
           RASET = 0x2B,
           RAMWR = 0x2C,
           MADCTL = 0x36,
           COLMOD = 0x3A,
           FRMCTR1 = 0xB1,
           FRMCTR2 = 0xB2,
           FRMCTR3 = 0xB3,
           INVCTR = 0xB4,
           PWCTR1 = 0xC0,
           PWCTR2 = 0xC1,
           PWCTR3 = 0xC2,
           PWCTR4 = 0xC3,
           PWCTR5 = 0xC4,
           VMCTR1 = 0xC5,
           GMCTRP1 = 0xE0,
           GMCTRN1 = 0xE1,
           DELAY = 0xFFFF
       }
 
       /**
        * Unicode representation
        * The unicode table is split into seven parts because of memory size and array size limitations of the microbit
        */
       let fontOne: number[] = [0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
       0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
       0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422]
       let fontTwo: number[] = [0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
       0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x00000000, 0x000002e0,
       0x00018060, 0x00afabea, 0x00aed6ea, 0x01991133, 0x010556aa, 0x00000060]
       let fontThree: number[] = [0x000045c0, 0x00003a20, 0x00051140, 0x00023880, 0x00002200, 0x00021080,
       0x00000100, 0x00111110, 0x0007462e, 0x00087e40, 0x000956b9, 0x0005d629, 0x008fa54c, 0x009ad6b7,
       0x008ada88, 0x00119531, 0x00aad6aa, 0x0022b6a2, 0x00000140, 0x00002a00]
       let fontFour: number[] = [0x0008a880, 0x00052940, 0x00022a20, 0x0022d422, 0x00e4d62e, 0x000f14be,
       0x000556bf, 0x0008c62e, 0x0007463f, 0x0008d6bf, 0x000094bf, 0x00cac62e, 0x000f909f, 0x000047f1,
       0x0017c629, 0x0008a89f, 0x0008421f, 0x01f1105f, 0x01f4105f, 0x0007462e]
       let fontFive: number[] = [0x000114bf, 0x000b6526, 0x010514bf, 0x0004d6b2, 0x0010fc21, 0x0007c20f,
       0x00744107, 0x01f4111f, 0x000d909b, 0x00117041, 0x0008ceb9, 0x0008c7e0, 0x01041041, 0x000fc620,
       0x00010440, 0x01084210, 0x00000820, 0x010f4a4c, 0x0004529f, 0x00094a4c]
       let fontSix: number[] = [0x000fd288, 0x000956ae, 0x000097c4, 0x0007d6a2, 0x000c109f, 0x000003a0,
       0x0006c200, 0x0008289f, 0x000841e0, 0x01e1105e, 0x000e085e, 0x00064a4c, 0x0002295e, 0x000f2944,
       0x0001085c, 0x00012a90, 0x010a51e0, 0x010f420e, 0x00644106, 0x01e8221e]
       let fontSeven: number[] = [0x00093192, 0x00222292, 0x00095b52, 0x0008fc80, 0x000003e0, 0x000013f1,
       0x00841080, 0x0022d422];
 
 
      /*
       * Send command to display
       */
      function send(command: TFTCommands, parameter: Array<number>): void {
          led.enable(false)
          // set TFT to command-receive mode
          pins.digitalWritePin(DCPIN, 0)
          // select TFT controller
          pins.digitalWritePin(CSPIN, 0)
          // Send command
          pins.spiWrite(command)
 
          // set TFT back to data-receive mode
          pins.digitalWritePin(DCPIN, 1)
 
          for (let item of parameter) {
              pins.spiWrite(item)
          }
 
          // deselect TFT controller
          pins.digitalWritePin(CSPIN, 1)
      }
 
      /*
       * Set pixel address window - minimum and maximum pixel bounds
       */
      function setWindow(x0: number, y0: number, x1: number, y1: number): void {
          send(TFTCommands.CASET, [0x00, x0, 0x00, x1])
          send(TFTCommands.RASET, [0x00, y0, 0x00, y1])
      }
 
      /*
       * Data-Mode to transfer data to TFT for further processing
       */
      function enterDataMode(): void {
          // Activate command mode
          pins.digitalWritePin(DCPIN, 0)
          // select TFT as SPI-target
          pins.digitalWritePin(CSPIN, 0)
          pins.spiWrite(TFTCommands.RAMWR)
          // Activate data mode
          pins.digitalWritePin(DCPIN, 1)
      }
 
      /*
       * Finish data-mode and set back to command-mode
       */
      function exitDataMode(): void {
          pins.digitalWritePin(CSPIN, 1) // de-elect the TFT as SPI target
          pins.digitalWritePin(DCPIN, 0) // command/data = command
      }
 
      /**
       * Initializes the TFT display
       */
      //% block="initialize TFT Display"
      //% subcategory="TFT1.8"
      //% weight=100
      export function tftInit(): void {
          // set SPI frequency
          pins.spiFrequency(4000000)
 
          // Software reset
          send(TFTCommands.SWRESET, [1])
          // Exit Sleep mode
          send(TFTCommands.SLPOUT, [1])
          // Frame rate control - normal mode
          send(TFTCommands.FRMCTR1, [0x01, 0x2C, 0x2D])
          // Frame rate control - idle mode
          send(TFTCommands.FRMCTR2, [0x01, 0x2C, 0x2D, 0x01, 0x2C, 0x2D])
          // Display inversion control
          send(TFTCommands.INVCTR, [0x07])
          // Display power control
          send(TFTCommands.PWCTR1, [0xA2, 0x02, 0x84])
          send(TFTCommands.PWCTR2, [0x8A, 0x2A])
          send(TFTCommands.PWCTR3, [0x0A, 0x00])
          send(TFTCommands.PWCTR4, [0x8A, 0x2A])
          send(TFTCommands.PWCTR5, [0x8A, 0xEE])
          send(TFTCommands.VMCTR1, [0x0E])
 
          // Disable inversion
          send(TFTCommands.INVOFF, [])
 
          // Memory access control
          send(TFTCommands.MADCTL, [0xC8])
 
          // Set 16-bit color mode
          send(TFTCommands.COLMOD, [0x05])
 
          // Column address set
          send(TFTCommands.CASET, [0x00, 0x00, 0x00, 0x7F])
          // Row address set
          send(TFTCommands.RASET, [0x00, 0x00, 0x00, 0x9F])
 
          // Set Gamma
          send(TFTCommands.GMCTRP1, [0x02, 0x1C, 0x07, 0x12, 0x37, 0x32, 0x29, 0x2D, 0x29, 0x25, 0x2B, 0x39, 0x00, 0x01, 0x03, 0x10])
          send(TFTCommands.GMCTRN1, [0x03, 0x1D, 0x07, 0x06, 0x2E, 0x2C, 0x29, 0x2D, 0x2E, 0x2E, 0x37, 0x3F, 0x00, 0x00, 0x02, 0x10])
 
          // Set normal mode
          send(TFTCommands.NORON, [])
 
          // Turn display on
          send(TFTCommands.DISPON, [])
      }
 
      /**
       * Draws a single pixel on the TFT
       * @param x X position of the pixel
       * @param y Y position of the pixel
       * @param color Color of the pixel
       */
      //% block="draw single pixel on TFT at x:%x|y:%y with color:%JoyPiAdvancedTFTColor"
      //% subcategory="TFT1.8"
      //% x.min=1 x.max=130
      //% y.min=1 y.max=162
      //% weight=90
      export function tftDrawPixel(x: number, y: number, color: JoyPiAdvancedTFTColor): void {
          setWindow(x + xOffset, y + yOffset, x+1, y+1)
          send(TFTCommands.RAMWR, [color >> 8, color])
      }
 
      /**
       * Draws a straight line on the TFT
       * @param x0 X coordinate of the start point
       * @param y0 Y coordinate of the start point
       * @param x1 X coordinate of the end point
       * @param y1 Y coordinate of the end point
       * @param color Color of the line
       */
      //% block="Draw line from x0:%x0|y0:%y0 to x1:%x1|y:%y1 with color:%JoyPiAdvancedTFTColor"
      //% subcategory="TFT1.8"
      //% x0.min=1 x0.max=130
      //% y0.min=1 y0.max=162
      //% x1.min=1 x1.max=130
      //% y1.min=1 y1.max=162
      //% weight=85
      export function tftDrawLine(x0: number, y0: number, x1: number, y1: number, color: JoyPiAdvancedTFTColor): void {
          let xDelta = x1 - x0
          let yDelta = y1 - y0
 
          if (Math.abs(yDelta) > Math.abs(xDelta)) {
              let ySteps = Math.abs(yDelta)
              let xIncrement = xDelta == 0 ? 0 : xDelta / ySteps
              let yIncrement = yDelta > 0 ? 1 : -1
 
              let x = x0
              let y = y0
              for (let steps = 0 ; steps <= ySteps ; steps++) {
                  tftDrawPixel(x, y, color)
              }
          }
          else {
              let xSteps = Math.abs(xDelta)
              let yIncrement = yDelta == 0 ? 0 : yDelta / xSteps
              let xIncrement = xDelta > 0 ? 1 : -1
 
              let y = y0
              let x = x0
              for (let steps = 0 ; steps <= xSteps ; steps++) {
                  tftDrawPixel(x, y, color)
                  y = y + yIncrement
                  x = x + xIncrement
              }
          }
      }
 
      /**
       * Draws a rectangle on the TFT
       * @param x X coordinate of the start point
       * @param y Y coordinate of the start point
       * @param width width of the rectangle
       * @param height height of the rectangle
       * @param color color of the rectangle
       */
      //% block="draw rectangle on TFT at x:%x|y:%y with width:%width|height:%height|color:%JoyPiAdvancedTFTColor"
      //% subcategory="TFT1.8"
      //% x.min=1 x.max=130
      //% y.min=1 y.max=162
      //% weight=80
      export function tftDrawRectangle(x: number, y: number, width: number, height: number, color: JoyPiAdvancedTFTColor): void {
 
         // Convert color
         let hiColor = (color >> 8) % 256
         let loColor = color % 256
 
         setWindow(x, y, x + width - 1, y + height - 1)
         enterDataMode()
 
         // Draw rectangle
         for(let indexY = height ; indexY > 0 ; indexY--) {
             for(let indexX = width ; indexX > 0 ; indexX--) {
                 pins.spiWrite(hiColor);
                 pins.spiWrite(loColor);
             }
         }
 
         exitDataMode()
      }
 
      /**
       * Draws a circle on the TFT
       * @param x X coordinate of the circle center point
       * @param y Y coordinate of the circle center point
       * @param radius Radius of the circle
       * @param color Color of the circle
       */
      //% block="draw circle on TFT at: x:%x|y:%y with radius:%r and color:%color"
      //% subcategory="TFT1.8"
      //% x.min=1 x.max=130
      //% y.min=1 y.max=162
      //% weight=75
      export function tftDrawCircle(x: number, y: number, radius: number, color: JoyPiAdvancedTFTColor): void {
         for(let y1 = -radius ; y1 <= 0 ; y1++) {
             for(let x1 = -radius ; x1 <= 0 ; x1++) {
                 if((x1 * x1 + y1 * y1) <= (radius * radius)) {
                     tftDrawPixel(x+x1, y+y1, color)
                     tftDrawPixel(x+x1, y-y1, color)
                     tftDrawPixel(x-x1, y+y1, color)
                     tftDrawPixel(x-x1, y-y1, color)
                 }
             }
         }
      }
 
      /**
       * Write a text on the TFT
       * @param text String that is supposed to be written
       * @param x X coordinate of the start point
       * @param y Y coordinate of the start point
       * @param zoom Zoom level of the text from 1 (small text) to 5 (large text)
       * @param color Color of the text
       * @param bgColor Background color of the text
       */
       //% block="show string:%string on TFT at x:%x and y:%y with zoom-level:%zoom color:%color and background color:%bgcolor"
       //% subcategory="TFT1.8"
       //% weight=70
       //% x.min=1 x.max=130
       //% y.min=1 y.max=162
       //% zoom.min=1 zoom.max=5
       export function tftShowString(text: string, x: number, y:number, zoom: number, color: JoyPiAdvancedTFTColor, bgColor: JoyPiAdvancedTFTColor): void {
           let hiColor = (color >> 8) % 256
           let loColor = color % 256
           let bgHiColor = (bgColor >> 8) % 256
           let bgLoColor = bgColor % 256
           let zoomFactor = zoom
           let index = 0
           let colsel = 0
           let unicode = 0
           let charIndex = 0
 
           for (let stringPos = 0 ; stringPos < text.length ; stringPos++) {
             // Get character at current string position and find the corresponding unicode representation
             charIndex = text.charCodeAt(stringPos)
             if (charIndex < 20) {
                 unicode = fontOne[charIndex]
             }
             else if (charIndex < 40) {
                 unicode = fontTwo[charIndex - 20]
             }
             else if (charIndex < 60) {
                 unicode = fontThree[charIndex - 40]
             }
             else if (charIndex < 80) {
                 unicode = fontFour[charIndex - 60]
             }
             else if (charIndex < 100) {
                 unicode = fontFive[charIndex - 80]
             }
             else if (charIndex < 120) {
                 unicode = fontSix[charIndex - 100]
             }
             else if (charIndex < 140) {
                 unicode = fontSeven[charIndex - 120]
             }
 
             // Set position and go into data mode
             setWindow (x + stringPos * 5 * zoomFactor, y, x + stringPos * 5 * zoomFactor + 5 * zoomFactor - 1, y + 5 * zoomFactor -1)
             enterDataMode()
 
             // write character to display
             for (let indexY = 0 ; indexY < 5 ; indexY++) {
                 for (let a = 0 ; a < zoomFactor ; a++) {
                     for (let indexX = 0 ; indexX < 5 ; indexX++) {
                         index = indexY + indexX * 5
                         colsel = (unicode & (1 << index))
                         for (let b = 0 ; b < zoomFactor ; b++) {
                             if (colsel) {
                                 pins.spiWrite(hiColor);
                                 pins.spiWrite(loColor);
                             }
                             else {
                                 pins.spiWrite(bgHiColor);
                                 pins.spiWrite(bgLoColor);
                             }
                         }
                     }
                 }
             }
 
             exitDataMode();
           }
       }
 
      /**
       * Clears all outputs on the TFT
       */
      //% block="clear TFT screen"
      //% subcategory="TFT1.8"
      //% weight=65
      export function tftClear(): void {
          tftDrawRectangle(0, 0, TFTWIDTH, TFTHEIGHT, JoyPiAdvancedTFTColor.black)
      }
 
      /**
       * Turns the TFT off
       */
      //% block="turn TFT display off"
      //% subcategory="TFT1.8"
      //% weight=60
      export function tftOff(): void {
          send(TFTCommands.DISPOFF, [])
      }
 
      /**
       * Turns the TFT on
       */
      //% block="turn TFT display on"
      //% subcategory="TFT1.8"
      //% weight=55
      export function tftOn(): void {
          send(TFTCommands.DISPON, [])
      }
 
 
  }
 