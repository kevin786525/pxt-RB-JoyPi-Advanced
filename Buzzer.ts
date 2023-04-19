/**
  * Buzzer Block
  */
//% color="#275C6B" weight=96 icon="\uf109" block="JoyPi Advanced"
namespace JoyPiAdvanced {
  const buzzerPin = AnalogPin.P7

  function scale(input: number, inMin: number, inMax: number, outMin: number, outMax: number) {
      return (input - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  //% block="Turn buzzer on with frequency %frequency"
  //% subcategory="Buzzer"
  //% weight=100
  //% frequency.min=100 frequency.max=20000 frequency.defl=100
  export function buzzerOn(frequency: number): void {
    frequency = scale(frequency, 100, 20000, 20000, 100);
    pins.analogWritePin(buzzerPin, 512)
    pins.analogSetPeriod(buzzerPin, frequency)
  }

  //% block="Turn buzzer off"
  //% subcategory="Buzzer"
  //% weight=90
  export function buzzerOff(): void {
    pins.analogWritePin(buzzerPin, 0)
  }

}
