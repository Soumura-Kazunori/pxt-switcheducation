
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */

/**
 * カスタムブロック
 */
//% weight=100 color=#0f00f0 icon="\uf2db"
namespace SwitchEducation {

    /** 
     * @param red 赤色, eg:500
     * @param green 緑色, eg:500
     * @param blue 青色, eg:500
    */
    //% subcategory="テープLED"
    //% blockId="switch_education_tapeled_analog"
    //% block="テープLED(アナログ) 赤　%red | 緑 %green | 青 %blue"
    //% red.min=0 red.max=1023
    //% green.min=0 green.max=1023
    //% blue.min=0 blue.max=1023
    export function tapeLedAnalog(red: number, green: number, blue: number): void {
        pins.analogWritePin(AnalogPin.P0, green)
        pins.analogWritePin(AnalogPin.P1, red)
        pins.analogWritePin(AnalogPin.P2, blue)
    }

    /** 
     * @param red 赤色, eg:0
     * @param green 緑色, eg:0
     * @param blue 青色, eg:0
    */
    //% subcategory="テープLED"
    //% blockId="switch_education_tapeled_digital"
    //% block="テープLED(デジタル) 赤　%red | 緑 %green | 青 %blue"
    //% red.min=0 red.max=1
    //% green.min=0 green.max=1
    //% blue.min=0 blue.max=1
    export function tapeLedDigital(red: number, green: number, blue: number): void {
        pins.digitalWritePin(DigitalPin.P0, green)
        pins.digitalWritePin(DigitalPin.P1, red)
        pins.digitalWritePin(DigitalPin.P2, blue)
    }

}
