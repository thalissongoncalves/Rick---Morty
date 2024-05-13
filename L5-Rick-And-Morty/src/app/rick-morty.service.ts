import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor() {}

  // função de chamada get para pegar os personagens da API
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

  // função de chamada get para pegar TODOS os personagens da API, a diferença aqui é que to pegando o data em vez do data.results para pegar o número total de páginas para filtragem
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

  // função de chamada get para pegar um personagem da API pelo id
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

  // função de chamada get para pegar os episódios por página da API
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

  // função de chamada get para pegar todos os episódios via API
  async getAllEpisodes(page: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/episode?page=${page}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar episódios");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro:", error);
      return [];
    }
  }

  // função para pegar episódio pelo id via API
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

  // função para pegar localizações por página via API
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

  // função para pegar localizações por id via API
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

  // função para pegar todas as localizações via API
  async getAllLocations(page: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/location?page=${page}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar localizacoes");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro:", error);
      return [];
    }
  }

}