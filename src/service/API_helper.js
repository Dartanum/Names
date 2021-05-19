import axios from "axios";

const URL = "https://namesgame.herokuapp.com/";        

//отправляет сказанное игроком имя
//проверяет, есть ли это имя в бд
//если есть, в ответ отправляет имя, которое должен сказать ассистент
//если нет, отправит пустую строку
export async function sendName(UserId, Name) {
    return await axios.post(`${URL}add_used`, {
        UserId,
        Name,
    });
}   

//очистить список использованных имен
export async function clearRequest(idUser) {
    await axios.post(`${URL}clear_user_info`, {"Id": idUser,});
}

//если никнейм у пользователя с таким id найден, то возвращает ник, 
//если не найден ник или пользователь, вернет пустую строку
export async function findNickName(Id) {
    return await axios.post(`${URL}get_nickname`, { Id, });
}

//при изменении никнейма отправить изменения в бэкенд
export async function sendNickName(idUser, nickname) {
    await axios.post(`${URL}manage_nickname`, {
        "UserId": idUser,
        "Nickname": nickname,
    })
}   