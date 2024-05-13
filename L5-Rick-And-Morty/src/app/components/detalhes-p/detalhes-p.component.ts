import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RickMortyService } from '../../rick-morty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-p',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent, CommonModule],
  templateUrl: './detalhes-p.component.html',
  styleUrl: './detalhes-p.component.scss'
})
export class DetalhesPComponent {
  id: number = 0;
  character: any[] = [];
  episodesId: string[] = [];
  episodeNames: string[] = [];
  episodeNumbers: string[] = [];

  constructor(private route: ActivatedRoute, private rickMortyFetchService: RickMortyService, private router: Router) {}

  // Ao carregar a página, pega o id no parâmetro e carrega os detalhes do personagem e episódios que ele aparece
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.rickMortyFetchService.getCharacterById(this.id)
      .then((data: any) => {
        this.character = this.character.concat(data);
        this.episodesId = data.episode.map((ep: string) => {
          const parts: string[] = ep.split('/');
          return parts[parts.length - 1]
        });
        this.episodesId.map((ep) => {
          let epId: number = Number(ep);
          this.rickMortyFetchService.getEpisodeById(epId)
            .then((data: any) => {
              this.episodeNames = this.episodeNames.concat(data.name);
              this.episodeNumbers = this.episodeNumbers.concat(data.episode);
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

  // Serve para mudar para a página de episódio baseado no id passado quando clica no episódio listado na página de detalhe de personagem
  changeEpisodeId(id: any) {
    this.router.navigateByUrl(`/episodios/${id}`);
  }
}
