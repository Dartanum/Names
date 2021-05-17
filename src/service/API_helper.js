import axios from "axios";

const URL = "";

export async function sendName(idUser, name) {
    const {data: newName} = await axios.post(`${URL}`, {
        UserId: idUser,
        Name: name,
    });
    return newName;
}

export async function clearRequest(idUser) {
    axios.delete(`${URL}`, {UserId: idUser});
}

export async function findNickName(idUser) {
    const response = await axios.get(`${URL}`, {
        params: { 
            UserId: idUser
            }
        });
    if(response === '1') return true;
    else return false;
}

export async function sendNickName(idUser, nickname) {
    await axios.post(`${URL}`, {params: {
        UserId: idUser,
        Nickname: nickname,
    }})
}