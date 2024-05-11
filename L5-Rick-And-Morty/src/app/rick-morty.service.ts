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

  async getAllCharacters(page: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/character?page=${page}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar personagens");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro:", error);
      return [];
    }
  }

  async getCharacterById(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/character/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar personagem");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro:", error);
      return null;
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

  async getEpisodeById(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/episode/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar episódio");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro:", error);
      return null;
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

  async getLocationById(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/location/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar localização");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro:", error);
      return null;
    }
  }

}