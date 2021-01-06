import Axios from './axiosService';

const httpService = new Axios();

export default class NoteService {
    baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api"

    saveNotes = (data, token) => {
    return httpService.Post(`${this.baseUrl}/notes/addNotes`, data,{
        headers: {
            Authorization: `${token}`,
          }
    });
  }
}