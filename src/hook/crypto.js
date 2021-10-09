import CryptoJS from 'crypto-js'

var key  = "dreamkarifha"; 
export function GetAesString(data,key){
  var encrypted = CryptoJS.DES.encrypt(data, key);
  return encrypted.toString();  //เข้ารหัส
}
export function GetDAesString (encrypted, key) {
  var decrypted =CryptoJS.DES.decrypt(encrypted.toString(),key);
  return decrypted.toString(CryptoJS.enc.Utf8); //ถอดรหัส
}

