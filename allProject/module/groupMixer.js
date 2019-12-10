/** 출처
 * https://github.com/dlthgml1997/Sopt25_SERVER/blob/master/homework/homework2/module/groupMixer.js
 * *************** 배운 점 *************
 * const mixedArray = memberArray.sort(function () { return 0.5 - Math.random(); });
 * (+) mix하는 부분을 이 한 코드로 정리하였습니다.
 * (+) Math.random()의 반환값은 -1 ~ 1 입니다.
 * (+) 즉, return 값은 -0.5 ~ 1.5가 됩니다.
 * (+) return 값이 양수이면 두 값의 위치가 swap되고 음수면 swap되지 않습니다.
 */
const groupMixer = {
    mix: (memberArray) => {
        return new Promise(async (resolve, reject) => {
            if (!memberArray instanceof Array) { // memberArray가 Array 형 타입인지 검사해준다.
                console.log(`memberArray's type is not Array`);
                return;
            }
            const mixedArray = await memberArray.sort(() => {
                return 0.5 - Math.random();
            });
            resolve(mixedArray);
        });
    },
}

module.exports = groupMixer;