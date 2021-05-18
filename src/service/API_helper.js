import axios from "axios";

const URL = "https://namesgame.herokuapp.com/";        

//отправляет сказанное игроком имя
//проверяет, есть ли это имя в бд
//если есть, в ответ отправляет имя, которое должен сказать ассистент
//если нет, отправит пустую строку
export async function sendName(idUser, name) {
    const {data: newName} = await axios.post(`${URL}add_used`, {
        UserId: idUser,
        Name: name,
    });
    return newName;
}

//очистить список использованных имен
export async function clearRequest(idUser) {
    axios.post(`${URL}clear_user_info`, {UserId: idUser});
}

//если никнейм у пользователя с таким id найден, то возвращает ник, 
//если не найден ник или пользователь, вернет пустую строку
export async function findNickName(Id) {
    const response = await axios.post(`${URL}get_nickname`, { Id, });
    return response;
}

//при изменении никнейма отправить изменения в бэкенд
export async function sendNickName(idUser, nickname) {
    await axios.post(`${URL}`, {params: {
        UserId: idUser,
        Nickname: nickname,
    }})
}   