//проверка на правильность вводимого сообщения
function isCorrect(current_name, names) {
  current_name = current_name.toLowerCase();
  let temp = names;
  let lastSym;
  //если введено короткое имя
  if (current_name.length <= 1) {
    return 1;
  }
  //если сообщение состоит из более чем 1 слова
  if (current_name.includes(" ")) {
    return 2;
  }
  //Проверка на кириллицу
  if (!inCyrillic(current_name)) {
    return 3;
  }
  //если это слово не первое
  if (temp.length !== 0) {
    let lastMsg = temp[temp.length - 1].name.toLowerCase();
    //проход по символам последнего сыгранного имени с конца для определения буквы, с которой должно начинаться текущее имя
    lastSym = getStartSymbol(lastMsg);
    if (current_name[0] !== lastSym) {
      return lastSym;
    }
    if(isExist(current_name, temp)) {
      return 4;
    }
  } 
  return 0;
}

function getStartSymbol(msg) {
  let lastSym;
  let isCorrect = true;
  const wrongLastChar = "ьъы";
  for (let i = msg.length - 1; i > 0; i--) {
    isCorrect = true;
    for (let ws of wrongLastChar) {
      //проверка символа на один из тех, на которые не может начинаться имя
      if (msg[i] === ws) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      lastSym = msg[i]; //буква, с которой должно быть введено слово
      break;
    }
  }
  return lastSym;
}

function inCyrillic(msg) {
  for (let i of msg) {
    if (
      !(
        (i.codePointAt() <= 1103 && i.codePointAt() >= 1072) ||
        i.codePointAt() === 1105
      )
    )
      return false;
  }
  return true;
}

function isExist(msg, messages) {
  for (let i of messages) {
    if (msg.toLowerCase() === i.name.toLowerCase()) return true;
  }
  return false;
}

export default isCorrect;
