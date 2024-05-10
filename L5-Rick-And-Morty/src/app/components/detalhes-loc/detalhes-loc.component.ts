import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private rickMortyFetchService: RickMortyService) {}

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
}
