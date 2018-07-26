
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
     * @param speed[0-1023] スピード , eg:500
     */
    //% subcategory="car"
    //% blockId="switch_education_go"
    //% block="前に進む スピード %speed=speedPicker \\%"
    //% speed.defl=500
    //% speed.min=0 speed.max=1023
    export function 前に進む(speed: number) {
        if (speed > 1023) {
            speed = 1023;
        }
        else if (speed < 0) {
            speed = 0;
        }
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 1);
        pins.analogWritePin(AnalogPin.P15, speed);

    }

    /**
     * @param speed[0-1023] スピード , eg:500
     */
    //% subcategory="car"
    //% blockId="switch_education_back"
    //% block="後ろに進む スピード %speed=speedPicker \\%"
    //% speed.defl=500
    //% speed.min=0 speed.max=1023
    export function 後ろに進む(speed: number) {
        if (speed > 1023) {
            speed = 1023;
        }
        else if (speed < 0) {
            speed = 0;
        }
        pins.digitalWritePin(DigitalPin.P13, 1);
        pins.digitalWritePin(DigitalPin.P14, 0);
        pins.analogWritePin(AnalogPin.P15, speed);

    }

    //% subcategory="car"
    //% blockId="switch_education_stop"
    //% block="止まる"
    export function 止まる() {
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);

    }

    //% subcategory="car"
    //% blockId="switch_education_light_on"
    //% block="ライトをつける"
    export function ライトをつける() {
        pins.digitalWritePin(DigitalPin.P16, 1);

    }

    //% subcategory="car"
    //% blockId="switch_education_light_off"
    //% block="ライトを消す"
    export function ライトを消す() {
        pins.digitalWritePin(DigitalPin.P16, 0);

    }


    /**
     * @param angle[0-180] 角度 , eg:90
     */
    //% subcategory="car"
    //% blockId="switch_education_servo"
    //% block="前輪　角度 %angle=speedPicker \\%"
    //% angle.defl=90
    //% angle.min=0 angle.max=180
    export function 前輪(angle: number) {
        if (angle > 180) {
            angle = 180;
        }
        else if (angle < 0) {
            angle = 0;
        }
        pins.servoWritePin(AnalogPin.P12, angle);

    }
}
