
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */


/**
 * カスタムブロック
 */
//% weight=100 color=#0f00f0 icon="\uf2db"
namespace SwitchEducation {
    

    //% blockId="switch_education_ledmeter"
    //% block="LEDを%value|個つける"
    //% value.min=0 value.max=25
    export function ledmeter(value: number): void{
        let x = 0
        let y = 0
        let maxLedNum = 25
        
        for(let i = 0; i < maxLedNum ; i++){
            if(i < value){
                led.plot(x, 4-y)
                
            }
            else{
                led.unplot(x,4-y)
            }
            x++;
            if(x == 5){
                x = 0;
                y++;
            }
        }
    }
}
