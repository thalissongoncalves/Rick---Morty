import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { LoginService } from '../../login.service';
import { tap } from 'rxjs';
import { FavoriteService } from '../../favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CabecalhoComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  username: string = "";
  characters: any[] = [];
  episodes: any[] = [];
  locations: any[] = [];

  constructor(private loginService: LoginService, private favoriteService: FavoriteService) {}

  // Ao carregar a página recupera o nome do usuario, atualiza os valores globais dos personagens, episódios e localizações favoritadas e recupera-os para renderização dos cards
  ngOnInit() {
    this.loginService.getUserTerm().pipe(
      tap((user) => {
        this.username = user;
      })
    ).subscribe()
    this.favoriteService.updateCharactersFavoriteSubject();
    this.favoriteService.getCharactersFavoriteSubject().pipe(
      tap((chars) => {
        this.characters = chars;
      })
    ).subscribe()
    this.favoriteService.updateEpisodesFavoriteSubject();
    this.favoriteService.getEpisodesFavoriteSubject().pipe(
      tap((ep) => {
        this.episodes = ep;
      })
    ).subscribe()
    this.favoriteService.updateLocationsFavoriteSubject();
    this.favoriteService.getLocationsFavoriteSubject().pipe(
      tap((loc) => {
        this.locations = loc;
      })
    ).subscribe()
  }

  // remove o card do array de personagens, fazendo assim sumir o card favoritado
  removeCardCharacters(id: number) {
    const index = this.characters.findIndex(ch => ch.id === id);
    if (index !== -1) {
      this.characters.splice(index, 1);
    }
  }

  // remove o card do array de episódios, fazendo assim sumir o card favoritado
  removeCardEpisodes(id: number) {
    const index = this.episodes.findIndex(ep => ep.id === id);
    if (index !== -1) {
      this.episodes.splice(index, 1);
    }
  }

  // remove o card do array de localizações, fazendo assim sumir o card favoritado
  removeCardLocations(id: number) {
    const index = this.locations.findIndex(loc => loc.id === id);
    if (index !== -1) {
      this.locations.splice(index, 1);
    }
  }

}
