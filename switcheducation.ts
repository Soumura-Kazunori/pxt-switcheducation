
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */



enum servoDir {
    //% block="右"
    right,
    //% block="左"
    left
}
enum turnDir {
    //% block="右"
    right,
    //% block="左"
    left
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
     * @param direction 回転方向, eg:servoDir.right
     * @param targetAngle 目標角度, eg:0
     * @param time 移動時間, eg:1000
     */
    //% subcategory="robot"
    //% blockId="switch_education_robot_head"
    //% block="頭サーボ:P1 回転方向 %direction | 角度 %angle | 時間(ms) %time"
    //% targetAngle.min=0 targetAngle.max=90
    export function moveHeadServo(direction: servoDir, angle: number, time: number): void {
        let targetAngle = 0
        if (direction == servoDir.right) {
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
    export function moveFootServo(rightFootDir: servoDir, rightFootAngle: number, leftFootDir: servoDir, leftFootAngle: number, time: number): void {
        let targetRightFootAngle = 0
        let targetLeftFootAngle = 0


        if (rightFootDir == servoDir.right) {
            targetRightFootAngle = originRightFootAngle + rightFootAngle
        }
        else {
            targetRightFootAngle = originRightFootAngle - rightFootAngle
        }

        if (leftFootDir == servoDir.right) {
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
            SwitchEducation.moveHeadServo(servoDir.right, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveFootServo(servoDir.left, 30, servoDir.left, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveHeadServo(servoDir.left, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveFootServo(servoDir.right, 30, servoDir.right, 30, time)
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
        SwitchEducation.moveHeadServo(servoDir.right, 0, 2500 - speed * 200)
        SwitchEducation.moveFootServo(servoDir.right, 0, servoDir.right, 0, 2500 - speed * 200)
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
            SwitchEducation.moveHeadServo(servoDir.right, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveFootServo(servoDir.right, 30, servoDir.right, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveHeadServo(servoDir.left, 30, time)
            if (cancelAction == 1) { break }
            SwitchEducation.moveFootServo(servoDir.left, 30, servoDir.left, 30, time)
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
                SwitchEducation.moveHeadServo(servoDir.left, 30, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveFootServo(servoDir.right, 0, servoDir.left, 45, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveHeadServo(servoDir.right, 30, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveFootServo(servoDir.right, 0, servoDir.right, 0, time)
            }
        }
        else if (direction == turnDir.left) {
            for (let i = 0; i < step; i++) {
                if (cancelAction == 1) { break }
                SwitchEducation.moveHeadServo(servoDir.right, 30, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveFootServo(servoDir.right, 45, servoDir.right, 0, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveHeadServo(servoDir.left, 30, time)
                if (cancelAction == 1) { break }
                SwitchEducation.moveFootServo(servoDir.right, 0, servoDir.right, 0, time)
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
            SwitchEducation.moveHeadServo(servoDir.left, 30, time)
            SwitchEducation.moveFootServo(servoDir.left, 0, servoDir.left, 50, time)
            SwitchEducation.moveFootServo(servoDir.right, 50, servoDir.right, 50, 0)
            SwitchEducation.moveFootServo(servoDir.right, 0, servoDir.right, 0, time)
            SwitchEducation.moveHeadServo(servoDir.right, 0, time)
        }
    }
}
