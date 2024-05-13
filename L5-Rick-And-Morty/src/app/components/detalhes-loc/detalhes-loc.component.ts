import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RickMortyService } from '../../rick-morty.service';

@Component({
  selector: 'app-detalhes-loc',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent, CommonModule],
  templateUrl: './detalhes-loc.component.html',
  styleUrl: './detalhes-loc.component.scss'
})
export class DetalhesLocComponent {
  id: number = 0;
  locations: any[] = [];
  charactersId: string[] = [];
  characterNames: string[] = [];
  characterImages: string[] = [];

  constructor(private route: ActivatedRoute, private rickMortyFetchService: RickMortyService, private router: Router) {}

  // Ao carregar a página, pega o id no parâmetro e carrega os detalhes da localização e personagens que nele habitam
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.rickMortyFetchService.getLocationById(this.id)
      .then((data: any) => {
        this.locations = this.locations.concat(data);
        this.charactersId = data.residents.map((ep: string) => {
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

  // Serve para mudar para a página de personagem baseado no id passado quando clica no personagem listado na página de detalhe de localização
  changeCharacterId(id: any) {
    this.router.navigateByUrl(`/personagens/${id}`);
  }
}
