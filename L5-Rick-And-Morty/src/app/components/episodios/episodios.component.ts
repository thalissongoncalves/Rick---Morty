import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../../search.service';
import { Subscription, tap } from 'rxjs';
import { EpisodesService } from '../../episodes.service';
import { FavoriteService } from '../../favorite.service';

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
  searchTerm: string = "";
  filterSubscription: Subscription | undefined;
  pageSubscription: Subscription | undefined;
  dataSubscription: Subscription | undefined;
  isLoadingSubscription: Subscription | undefined;
  searchTermSubscription: Subscription | undefined;

  constructor(private router: Router, private searchService: SearchService, private episodesService: EpisodesService, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.episodesService.allEpisodesGet(this.page);
    this.episodesService.updatePage(this.page);
    this.episodesService.updateIsLoading(this.isLoading);

    this.searchService.searchTerm$.subscribe(value => {
      this.searchService.getSearchTerm().pipe(
        tap((text) => {
          this.searchTerm = text;
        })
      ).subscribe()
    });
    
    if (this.searchTerm !== "") {
      this.episodesService.updateSetFilter(true);
      this.episodesService.episodes$.subscribe(data => {
        this.episodesService.getEpisodes().pipe(
          tap((data) => {
            this.episodes = data;
          })
        ).subscribe()
      })
    } else {
      this.episodesService.updateSetFilter(false);
      this.episodesService.episodes$.subscribe(data => {
        this.episodesService.getEpisodes().pipe(
          tap((data) => {
            this.episodes = data;
          })
        ).subscribe()
      });
    };

    this.episodesService.pageTerm$.subscribe(page => {
      if (page !== 0) {
        this.episodesService.getPageTerm().pipe(
          tap((value) => {
            this.page = value;
          })
        ).subscribe()
      }
    });

    this.episodesService.isLoadingTerm$.subscribe(value => {
      this.episodesService.getIsLoading().pipe(
        tap((value) => {
          this.isLoading = value;
        })
      ).subscribe()
    });

    this.registerScrollListener();
  }

  registerScrollListener(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) {
      if (!this.isLoading) {
        this.episodesService.loadEpisodes(this.page);
      }
    }
  }

  changeEpisodeId(id: number) {
    this.router.navigateByUrl(`/episodios/${id}`);
  }

  favoriteEpisode(id: number, name: string, episode: string): void {
    this.favoriteService.updateEpisodesFavorite({id, name, episode});
  }

}
