import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  charId: number[] = [];

  constructor(private route: ActivatedRoute, private rickMortyFetchService: RickMortyService, private router: Router) {}

  // Ao carregar a página, pega o id no parâmetro e carrega os detalhes do episódio e personagens que nele aparece
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
              this.charId = this.charId.concat(data.id);
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

  // Serve para mudar para a página de personagem baseado no id passado quando clica no personagem listado na página de detalhe de episódio
  changeCharacterId(id: any) {
    this.router.navigateByUrl(`/personagens/${id}`);
  }
}
