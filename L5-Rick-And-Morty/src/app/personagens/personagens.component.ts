import { Component, HostListener, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RickMortyService } from '../rick-morty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personagens',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent, CommonModule],
  templateUrl: './personagens.component.html',
  styleUrl: './personagens.component.scss'
})
export class PersonagensComponent implements OnInit {
  characters: any[] = [];
  isLoading: boolean = false;
  page: number = 1;

  constructor(private rickMortyFetchService: RickMortyService) {}

  ngOnInit(): void {
    this.loadCharacters(this.page);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) {
      if (!this.isLoading) {
        this.loadCharacters(this.page)
      }
    }
  }

  loadCharacters(page: number): void {
    this.isLoading = true;
    this.rickMortyFetchService.getCharacters(page)
      .then((data: any) => {
        this.characters = this.characters.concat(data);
        this.isLoading = false;
        this.page++;
      })
      .catch(error => {
        console.error("Erro:", error);
        this.isLoading = false;
      });
  }
  
}
