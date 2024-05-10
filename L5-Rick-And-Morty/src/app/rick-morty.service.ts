import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor() {}

  async getCharacters(page: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/character?page=${page}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar personagens");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Erro:", error);
      return [];
    }
  }

  async getEpisodies(page: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/episode?page=${page}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar episódios");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Erro:", error);
      return [];
    }
  }

  async getLocations(page: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/location?page=${page}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar localizações");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Erro:", error);
      return [];
    }
  }

}