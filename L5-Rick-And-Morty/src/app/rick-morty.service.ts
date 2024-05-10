import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor() {}

  getCharacters(page: number): Promise<any> {
    return fetch(`${this.apiUrl}/character?page=${page}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar personagens");
        }
        return response.json();
      })
      .then(data => data.results)
      .catch(error => {
        console.error("Erro:", error);
        return [];
      });
  }
}