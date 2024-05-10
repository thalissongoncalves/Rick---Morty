import { Component, HostListener } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RickMortyService } from '../rick-morty.service';

@Component({
  selector: 'app-localizacoes',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent, CommonModule],
  templateUrl: './localizacoes.component.html',
  styleUrl: './localizacoes.component.scss'
})
export class LocalizacoesComponent {
  locations: any[] = [];
  isLoading: boolean = false;
  page: number = 1;

  constructor(private rickMortyFetchService: RickMortyService) {}

  ngOnInit(): void {
    this.loadLocations(this.page);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) {
      if (!this.isLoading) {
        this.loadLocations(this.page)
      }
    }
  }

  loadLocations(page: number): void {
    this.isLoading = true;
    this.rickMortyFetchService.getLocations(page)
      .then((data: any) => {
        this.locations = this.locations.concat(data);
        this.isLoading = false;
        this.page++;
      })
      .catch(error => {
        console.error("Erro:", error);
        this.isLoading = false;
      });
  }
}
