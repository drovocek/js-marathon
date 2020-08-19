
let userNum = prompt('Hi Bro! Enter your telephone number (format, like +71234567890), and get the magic :)');

while(!validatePhoneFormat(userNum)){
    userNum = prompt('Enter your correct telephone number (format, like +71234567890)');
}

console.log(formattedPhone(userNum)); // +7 (123) 456-78-90

function formattedPhone(phone) {
    const simbols = ['','',' (','','',') ','','','-','','-',''];
    let result = '';
    for(let i = 0; i < phone.length; i++){
        result += simbols[i] + phone.charAt(i);
    }
    return result;
}

//check correct telephone format
function validatePhoneFormat(phone){
    //add other format validation checks to taste
    if (phone.length != 12){
        alert('You entered the number in the wrong format!!! Try again');
        return false;
    }
    return true;
}


//Task1
// const firstRow = 'мама мыла раму';
// const secondRow = 'собака друг человека';
//
// function getRow(firstRow, secondRow) {
//     if(getCountA(firstRow) > getCountA(secondRow)) return firstRow;
//     return secondRow;
// }
//
// function getCountA(str){
//     let count = 0;
//     for(let i = 0; i < str.length; i++){
//         if(str.charAt(i) == 'а') {
//             count++;
//         }
//     }
//     console.log(count);
//     return count;
// }
//
// console.log(getRow(firstRow, secondRow)); // мама мыла раму
