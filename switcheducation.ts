
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */

enum turnDir {
    //% block="右"
    right,
    //% block="左"
    left
}

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
    let originHeadAngle = 0
    let currentHeadAngle = 90
    let originLeftFootAngle = 0
    let currentLeftFootAngle = 90
    let originRightFootAngle = 0
    let currentRightFootAngle = 90
    let cancelAction = 0

    /**
     * @param direction 回転方向, eg:turnDir.right
     * @param targetAngle 目標角度, eg:0
     * @param time 移動時間, eg:1000
     */
    //% subcategory="robot"
    //% blockId="switch_education_robot_head"
    //% block="頭サーボ:P1 回転方向 %direction | 角度 %angle | 時間(ms) %time"
    //% targetAngle.min=0 targetAngle.max=90
    export function moveHeadServo(direction: turnDir, angle: number, time: number): void {
        let targetAngle = 0
        if (direction == turnDir.right) {
            targetAngle = originHeadAngle + angle
        }
        else {
            targetAngle = originHeadAngle - angle
        }


        let diff = (targetAngle - currentHeadAngle)
        let stepTime = Math.abs(time) / Math.abs(diff)
        if (diff >= 0) {
            for (let i = 0; i <= diff; i++) {
                pins.servoWritePin(AnalogPin.P1, currentHeadAngle + i)
                basic.pause(stepTime)
            }
        }
        else {
            for (let i = 0; i <= Math.abs(diff); i++) {
                pins.servoWritePin(AnalogPin.P1, currentHeadAngle - i)
                basic.pause(stepTime)
            }
        }
        currentHeadAngle = targetAngle

    }

    /**
     * @param leftFootAngle  左足サーボ , eg:0
     * @param headAngle 頭サーボ , eg:0
     * @param rightFootAngle 右足サーボ , eg:0
     */
    //% subcategory="robot"
    //% blockId="switch_education_robot_setangle"
    //% block="初期設定 | 右足サーボ:P0 %rightFootAngle | 頭サーボ:P1 %headAngle | 左足サーボ:P2 %leftFootAngle"
    export function setAngle(rightFootAngle: number, headAngle: number, leftFootAngle: number): void {
        originHeadAngle = headAngle + 90
        originLeftFootAngle = leftFootAngle + 90
        originRightFootAngle = rightFootAngle + 90
        currentHeadAngle = originHeadAngle
        currentLeftFootAngle = originLeftFootAngle
        currentRightFootAngle = originRightFootAngle
        pins.servoWritePin(AnalogPin.P0, currentRightFootAngle)
        pins.servoWritePin(AnalogPin.P1, currentHeadAngle)
        pins.servoWritePin(AnalogPin.P2, currentLeftFootAngle)

    }

    //% subcategory="robot"
    //% blockId="switch_education_root_foot"
    //% block="右足サーボ:P0　回転方向 %rightFootDir | 角度　%rightFootAngle | 左足サーボ:P2　回転方向 %leftFootDir | 角度 %leftFootAngle | 時間(ms) %time"
    export function moveFootServo(rightFootDir: turnDir, rightFootAngle: number, leftFootDir: turnDir, leftFootAngle: number, time: number): void {
        let targetRightFootAngle = 0
        let targetLeftFootAngle = 0


        if (rightFootDir == turnDir.right) {
            targetRightFootAngle = originRightFootAngle + rightFootAngle
        }
        else {
            targetRightFootAngle = originRightFootAngle - rightFootAngle
        }

        if (leftFootDir == turnDir.right) {
            targetLeftFootAngle = originLeftFootAngle + leftFootAngle
        }
        else {
            targetLeftFootAngle = originLeftFootAngle - leftFootAngle
        }


        let diffRight = (targetRightFootAngle - currentRightFootAngle)
        let diffLeft = (targetLeftFootAngle - currentLeftFootAngle)
        let diff = Math.max(Math.abs(diffRight), Math.abs(diffLeft))
        let stepTime = Math.abs(time) / diff

        for (let i = 0; i <= diff; i++) {
            if (targetRightFootAngle != currentRightFootAngle) {
                if (diffRight >= 0) {
                    currentRightFootAngle += 1
                    pins.servoWritePin(AnalogPin.P0, currentRightFootAngle)
                }
                else {
                    currentRightFootAngle -= 1
                    pins.servoWritePin(AnalogPin.P0, currentRightFootAngle)
                }
            }
            if (targetLeftFootAngle != currentLeftFootAngle) {
                if (diffLeft >= 0) {
                    currentLeftFootAngle += 1
                    pins.servoWritePin(AnalogPin.P2, currentLeftFootAngle)
                }
                else {
                    currentLeftFootAngle -= 1
                    pins.servoWritePin(AnalogPin.P2, currentLeftFootAngle)
                }
            }
            basic.pause(stepTime)
        }

    }
    /**
     * @param step 歩数 , eg:2
     * @param speed スピード , eg:5
     */
    //% subcategory="robot"
    //% blockId="switch_education_root_moveforward"
    //% block="前進　歩数 %step | スピード %speed"
    //% speed.min=0 speed.max=10
    export function moveForward(step: number, speed: number): void {
        let time = 2500 - speed * 200
        cancelAction = 0
        for (let i = 0; i < step; i++) {
            if (cancelAction == 1) { break }
            SwitchEducation.moveHeadServo(turnDir.right, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveFootServo(turnDir.left, 30, turnDir.left, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveHeadServo(turnDir.left, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveFootServo(turnDir.right, 30, turnDir.right, 30, time)
        }
        SwitchEducation.upright(speed)
    }
    /**
     * @param speed スピード , eg:5
     */
    //% subcategory="robot"
    //% blockId="switch_education_robot_upright"
    //% block="直立姿勢 %speed"
    //% speed.min=0 speed.max=10
    export function upright(speed: number): void {
        SwitchEducation.moveHeadServo(turnDir.right, 0, 2500 - speed * 200)
        SwitchEducation.moveFootServo(turnDir.right, 0, turnDir.right, 0, 2500 - speed * 200)
    }

    /**
     * @param step 歩数 , eg:2
     * @param speed スピード , eg:5
     */
    //% subcategory="robot"
    //% blockId="switch_education_robot_backward"
    //% block="後進 歩数 %step | スピード %speed"
    //% speed.min=0 speed.max=10
    export function moveBackward(step: number, speed: number): void {
        let time = 2500 - speed * 200
        cancelAction = 0
        for (let i = 0; i < step; i++) {
            if (cancelAction == 1) { break }
            SwitchEducation.moveHeadServo(turnDir.right, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveFootServo(turnDir.right, 30, turnDir.right, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveHeadServo(turnDir.left, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveFootServo(turnDir.left, 30, turnDir.left, 30, time)
        }
        SwitchEducation.upright(speed)
    }
    //% subcategory="robot"
    //% blockId="switch_education_robot_cancel"
    //% block="動作キャンセル"
    export function cancel(): void {
        cancelAction = 1
    }

    /**
     * @param step 歩数 , eg:2
     * @param speed スピード , eg:5
     */
    //% subcategory="robot"
    //% blockId="switch_education_robot_turn"
    //% block="旋回　方向 %direction | 歩数 %step | スピード %speed"
    //% speed.min=0 speed.max=10
    export function turning(direction: turnDir, step: number, speed: number): void {
        let time = 2500 - speed * 200
        cancelAction = 0

        if (direction == turnDir.right) {
            for (let i = 0; i < step; i++) {
                if (cancelAction == 1) { break }
                SwitchEducation.moveHeadServo(turnDir.left, 30, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveFootServo(turnDir.right, 0, turnDir.left, 45, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveHeadServo(turnDir.right, 30, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveFootServo(turnDir.right, 0, turnDir.right, 0, time)
            }
        }
        else if (direction == turnDir.left) {
            for (let i = 0; i < step; i++) {
                if (cancelAction == 1) { break }
                SwitchEducation.moveHeadServo(turnDir.right, 30, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveFootServo(turnDir.right, 45, turnDir.right, 0, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveHeadServo(turnDir.left, 30, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveFootServo(turnDir.right, 0, turnDir.right, 0, time)
            }
        }
        SwitchEducation.upright(speed)
    }

    /**
     * @param speed スピード , eg:5
     */
    //% subcategory="robot"
    //% blockId="switch_education_robot_kick"
    //% block="キック  足 %foot | スピード %speed"
    //% speed.min=0 speed.max=10
    export function kick(foot: turnDir, speed: number): void {
        let time = 2500 - 200 * speed
        if (foot == turnDir.right) {
            SwitchEducation.moveHeadServo(turnDir.left, 30, time)
            SwitchEducation.moveFootServo(turnDir.left, 0, turnDir.left, 50, time)
            SwitchEducation.moveFootServo(turnDir.right, 50, turnDir.right, 50, 0)
            SwitchEducation.moveFootServo(turnDir.right, 0, turnDir.right, 0, time)
            SwitchEducation.moveHeadServo(turnDir.right, 0, time)
        }
    }

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

    //% blockId="switch_education_ledmeter"
    //% block="LEDを %value 個つける"
    //% value.min=0 value.max=25
    export function ledmeter(value: number): void{
        let x = 0
        let y = 0
        let maxLedNum = 25
        
        for(let i = 0; i < maxLedNum ; i++){
            if(i < value){
                led.plot(x, 4-y)
                x++;
                if(x == 5){
                    x = 0;
                    y++;
                }
            }
            else{
                led.unplot(x,4-y)
            }
        }
    }










}
