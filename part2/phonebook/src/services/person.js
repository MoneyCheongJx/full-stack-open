import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const deletePerson = (newObject) => {
    const newUrl = `http://localhost:3001/persons/${newObject.id}`;
    return axios.delete(newUrl)
}


export default {getAll, create, update, deletePerson}