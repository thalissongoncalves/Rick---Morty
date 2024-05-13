import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private charactersFavoriteSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  charactersFavorite$: Observable<any[]> = this.charactersFavoriteSubject.asObservable();
  private episodesFavoriteSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  episodesFavorite$: Observable<any[]> = this.episodesFavoriteSubject.asObservable();
  private locationsFavoriteSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  locationsFavorite$: Observable<any[]> = this.locationsFavoriteSubject.asObservable();
  private charactersFavorite: any[] = [];
  private episodesFavorite: any[] = [];
  private locationsFavorite: any[] = [];

  constructor() { }

  updateCharactersFavorite(data: object | any): void {
    if (!this.charactersFavorite.some((ch) => ch.id === data.id)) {
      this.charactersFavorite.push(data);
    }
  }

  updateCharactersFavoriteSubject(): void {
    this.charactersFavoriteSubject.next(this.charactersFavorite);
  }

  getCharactersFavoriteSubject() {
    return this.charactersFavorite$;
  }

  updateEpisodesFavorite(data: object | any): void {
    if (!this.episodesFavorite.some((ep) => ep.id === data.id)) {
      this.episodesFavorite.push(data);
    }
  }

  updateEpisodesFavoriteSubject(): void {
    this.episodesFavoriteSubject.next(this.episodesFavorite);
  }

  getEpisodesFavoriteSubject() {
    return this.episodesFavorite$;
  }
}
