const arr = [
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), //a-z
    ...Array.from({ length: 9 }, (_, i) => i + 1), //1-9
  ];


  const genUniqueId = () =>{
    let uniqueId = "";

  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * arr.length);
    uniqueId += arr[random];
  }
  return uniqueId
  }
 module.exports = genUniqueId