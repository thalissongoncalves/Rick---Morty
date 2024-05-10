import { Component, HostListener, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RickMortyService } from '../../rick-morty.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent, CommonModule],
  templateUrl: './episodios.component.html',
  styleUrl: './episodios.component.scss'
})
export class EpisodiosComponent implements OnInit {
  episodes: any[] = [];
  isLoading: boolean = false;
  page: number = 1;

  constructor(private rickMortyFetchService: RickMortyService, private router: Router) {}

  ngOnInit(): void {
    this.loadEpisodes(this.page);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) {
      if (!this.isLoading) {
        this.loadEpisodes(this.page)
      }
    }
  }

  loadEpisodes(page: number): void {
    this.isLoading = true;
    this.rickMortyFetchService.getEpisodies(page)
      .then((data: any) => {
        this.episodes = this.episodes.concat(data);
        this.isLoading = false;
        this.page++;
      })
      .catch(error => {
        console.error("Erro:", error);
        this.isLoading = false;
      });
  }

  changeEpisodeId(id: number) {
    this.router.navigateByUrl(`/episodios/${id}`);
  }

}
