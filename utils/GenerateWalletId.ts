import md5 from 'md5';
const generateWalletId = (AccountId: string, UserId: string) => {
    // Make an array of numbers
    const NUM_ARR = [1,2,3,4,5,6,7,8,9,0];
    // Use md5 to generate a hash
    const HASH = md5(`${AccountId} ${UserId}`);
    
    // Filter the hash and retrieve 6-8 numbers
    let walletIdArr = [];
    for (let item of HASH) {
        if (NUM_ARR.indexOf(Number(item)) >=0 && walletIdArr.length <= 8) {
            walletIdArr.push(item);
        }
    }
    return Number(walletIdArr.join(''));
}

export default generateWalletId;