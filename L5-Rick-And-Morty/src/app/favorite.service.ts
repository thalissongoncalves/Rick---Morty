import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  // reservado para armazenar os personagens favoritados para compartilhar com os componentes
  private charactersFavoriteSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  charactersFavorite$: Observable<any[]> = this.charactersFavoriteSubject.asObservable();
  // reservado para armazenar os episódios favoritados para compartilhar com os componentes
  private episodesFavoriteSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  episodesFavorite$: Observable<any[]> = this.episodesFavoriteSubject.asObservable();
  // reservado para armazenar as localizações favoritados para compartilhar com os componentes
  private locationsFavoriteSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  locationsFavorite$: Observable<any[]> = this.locationsFavoriteSubject.asObservable();
  private charactersFavorite: any[] = [];
  private episodesFavorite: any[] = [];
  private locationsFavorite: any[] = [];

  constructor() { }

  // função reservada para verificar se já tem o personagem favoritado, caso não tenha, armazena no charactersFavorite
  updateCharactersFavorite(data: object | any): void {
    if (!this.charactersFavorite.some((ch) => ch.id === data.id)) {
      this.charactersFavorite.push(data);
    }
  }

  // função reservada para atualizar globalmente o armazenamento de personagens favoritados
  updateCharactersFavoriteSubject(): void {
    this.charactersFavoriteSubject.next(this.charactersFavorite);
  }

  // função reservada para pegar os personagens armazenados globalmente
  getCharactersFavoriteSubject() {
    return this.charactersFavorite$;
  }

  // função reservada para verificar se já tem o episódio favoritado, caso não tenha, armazena no episodesFavorite
  updateEpisodesFavorite(data: object | any): void {
    if (!this.episodesFavorite.some((ep) => ep.id === data.id)) {
      this.episodesFavorite.push(data);
    }
  }

  // função reservada para atualizar globalmente o armazenamento de episódios favoritados
  updateEpisodesFavoriteSubject(): void {
    this.episodesFavoriteSubject.next(this.episodesFavorite);
  }

  // função reservada para pegar os episódios armazenados globalmente
  getEpisodesFavoriteSubject() {
    return this.episodesFavorite$;
  }

  // função reservada para verificar se já tem a localização favoritado, caso não tenha, armazena no locationsFavorite
  updateLocationsFavorite(data: object | any): void {
    if (!this.locationsFavorite.some((loc) => loc.id === data.id)) {
      this.locationsFavorite.push(data);
    }
  }

  // função reservada para atualizar globalmente o armazenamento de localizações favoritados
  updateLocationsFavoriteSubject(): void {
    this.locationsFavoriteSubject.next(this.locationsFavorite);
  }

  // função reservada para pegar os localizações armazenados globalmente
  getLocationsFavoriteSubject() {
    return this.locationsFavorite$;
  }
}
