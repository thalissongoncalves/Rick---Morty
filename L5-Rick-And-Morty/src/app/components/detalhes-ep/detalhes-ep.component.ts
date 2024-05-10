import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RickMortyService } from '../../rick-morty.service';

@Component({
  selector: 'app-detalhes-ep',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent, CommonModule],
  templateUrl: './detalhes-ep.component.html',
  styleUrl: './detalhes-ep.component.scss'
})
export class DetalhesEpComponent {
  id: number = 0;
  episode: any[] = [];
  charactersId: string[] = [];
  characterNames: string[] = [];
  characterImages: string[] = [];

  constructor(private route: ActivatedRoute, private rickMortyFetchService: RickMortyService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.rickMortyFetchService.getEpisodeById(this.id)
      .then((data: any) => {
        this.episode = this.episode.concat(data);
        this.charactersId = data.characters.map((ep: string) => {
          const parts: string[] = ep.split('/');
          return parts[parts.length - 1]
        });
        this.charactersId.map((ep) => {
          let charId: number = Number(ep);
          this.rickMortyFetchService.getCharacterById(charId)
            .then((data: any) => {
              this.characterNames = this.characterNames.concat(data.name);
              this.characterImages = this.characterImages.concat(data.image);
            })
            .catch(error => {
              console.error("Erro:", error);
            }
          )
        })
      })
      .catch(error => {
        console.error("Erro:", error);
      }
    );
    
  }
}
