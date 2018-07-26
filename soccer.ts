
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */

enum wheelDir {
    //% block="cw"
    cw,
    //% block="ccw"
    ccw
}

/**
 * カスタムブロック
 */
//% weight=100 color=#0f00f0 icon="\uf2db"
namespace SwitchEducation {

    /**
     * @param dir1 回転方向, eg:wheelDir.ccw
     * @param speed1[0-90]  スピード, eg:0
     * @param dir2 回転方向, eg:wheelDir.cw
     * @param speed2[0-90]  スピード, eg:0
     */
    //% subcategory="soccer"
    //% blockId="switch_education_wheel"
    //% block="回転サーボ:P1 回転方向 %dir1 | スピード %speed1 |回転サーボ:P2 回転方向 %dir2 | スピード %speed2"
    //% speed1.min=0 speed1.max=90
    //% speed2.min=0 speed2.max=90
    export function wheel(dir1: wheelDir, speed1: number, dir2: wheelDir, speed2: number): void {
        if (speed1 > 90) {
            speed1 = 90;
        }
        else if (speed1 < 0) {
            speed1 = 0;
        }
        if (speed2 > 90) {
            speed2 = 90;
        }
        else if (speed2 < 0) {
            speed2 = 0;
        }

        if (dir1 == wheelDir.cw) {
            pins.servoWritePin(AnalogPin.P1, 90 - speed1)
        }
        else {
            pins.servoWritePin(AnalogPin.P1, 90 + speed1)
        }
        if (dir2 == wheelDir.cw) {
            pins.servoWritePin(AnalogPin.P2, 90 - speed2)
        }
        else {
            pins.servoWritePin(AnalogPin.P2, 90 + speed2)
        }
    }

    /**
     * @param angle[0-180] 角度 ,eg:90
     */
    //% subcategory="soccer"
    //% blockId="switch_education_servo"
    //% block="追加サーボ:P0 角度 %angle"
    //% angle.min=0 angle.max=180
    export function 追加サーボ(angle: number): void {
        pins.servoWritePin(AnalogPin.P0, angle)
    }

    /**
     * @param
     */
    //% subcategory="soccer"
    //% blockId="switch_education_rote_servo"
    //% block="追加回転サーボ:P0 回転方向 %dir | スピード %speed"
    //% speed.min=0 speed.max=90
    export function 追加回転サーボ(dir: wheelDir, speed: number): void {
        if (dir == wheelDir.cw) {
            pins.servoWritePin(AnalogPin.P0, 90 - speed)
        }
        else {
            pins.servoWritePin(AnalogPin.P0, 90 + speed)
        }
    }
}
