namespace JoyPiAdvanced {
    const dhtPin = DigitalPin.P8;
    let humidity = 0;
    let temperature = 0;
    let lastMeasurement = 0;
  
  
    function measureDHT11(){
  
      if(input.runningTime() > (lastMeasurement + 2000))
      {
        //initialize
        let endTime: number = 0;
        let dataArray: boolean[] = [];
        let resultArray: number[] = [];
  
        for (let index = 0; index < 40; index++) {
          dataArray.push(false);
        }
  
        for (let index = 0; index < 5; index++) {
          resultArray.push(0);
        }
  
        // begin protocol, request data
        pins.digitalWritePin(dhtPin, 0);
        basic.pause(18);
        pins.setPull(dhtPin, PinPullMode.PullUp);
        pins.digitalReadPin(dhtPin);
        control.waitMicros(40);
  
        // Continue if sensor is responding
        if (pins.digitalReadPin(dhtPin) != 1) {
            while (pins.digitalReadPin(dhtPin) == 0);
            while (pins.digitalReadPin(dhtPin) == 1);
            //read data (5 bytes)
            for (let index = 0; index < 40; index++) {
                while (pins.digitalReadPin(dhtPin) == 1);
                while (pins.digitalReadPin(dhtPin) == 0);
                control.waitMicros(28);
  
                if (pins.digitalReadPin(dhtPin) == 1) {
                  dataArray[index] = true;
                }
            }
  
            // convert byte number array to integer
            for (let index = 0; index < 5; index++) {
                for (let index2 = 0; index2 < 8; index2++) {
                    if (dataArray[8 * index + index2]) {
                      resultArray[index] += 2 ** (7 - index2);
                    }
                }
            }
  
            humidity = resultArray[0] + resultArray[1] / 100;
            temperature = resultArray[2] + resultArray[3] / 100;
            lastMeasurement = input.runningTime();
        }
      }
    }
  
    /**
     * Measure temperature with DHT11
     */
    //% block="DHT11 temperature"
    //% subcategory="DHT11"
    //% weight=100
    export function dht11GetTemperature(): number {
      measureDHT11();
      return temperature;
    }
  
    /**
     * Measure humidity with DHT11
     */
    //% block="DHT11 humidity"
    //% subcategory="DHT11"
    //% weight=90
    export function dht11GetHumidity(): number {
      measureDHT11();
      return humidity;
    }
  
  
  }
  