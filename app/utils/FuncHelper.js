export function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
export function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

export function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
export const  tinhNgay =(date1)=>{

    date1 = new Date(date1)
   var date2 = new Date()
   if(date1.getTime() >date2.getTime()){

       var Difference_In_Time = date1.getTime() - date2.getTime();
       day = Difference_In_Time / (1000 * 3600 * 24);
      
     return day
     
   }
   
   return -1;
}
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}