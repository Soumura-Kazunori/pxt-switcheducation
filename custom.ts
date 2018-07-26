/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * カスタムブロック
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * TODO: ここに関数を記述してください
     * @param n ここでパラメーターの説明をしてください。, eg: 5
     * @param s ここでパラメーターの説明をしてください。, eg: "Hello"
     * @param e ここでパラメーターの説明をしてください。
     */    
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: ここに関数を記述してください
     * @param value ここで値の説明をしてください。, eg: 5
     */    
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
    //% blockId="switch_led"
    //% block="LEDを%value|こつける"
    export function ledmeter(value: number):void{
        
    }
}
