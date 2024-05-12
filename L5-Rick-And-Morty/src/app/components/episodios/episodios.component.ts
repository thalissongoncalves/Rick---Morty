import { Component, HostListener, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RickMortyService } from '../../rick-morty.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../../search.service';
import { Subscription, tap } from 'rxjs';
import { DataService } from '../../data.service';
import { EpisodesService } from '../../episodes.service';

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
  searchTemSubscription: Subscription | undefined;

  constructor(private router: Router, private searchService: SearchService, private episodesService: EpisodesService) {}

  ngOnInit(): void {
    this.episodesService.allEpisodesGet(this.page);
    this.episodesService.updatePage(this.page);
    this.episodesService.updateIsLoading(this.isLoading);
    
    this.searchTemSubscription = this.searchService.searchTerm$.subscribe(value => {
      this.searchService.getSearchTerm().pipe(
        tap((text) => {
          this.searchTerm = text;
        })
      ).subscribe()
    })
    this.pageSubscription = this.episodesService.pageTerm$.subscribe(page => {
      if (page !== 0) {
        this.episodesService.getPageTerm().pipe(
          tap((value) => {
            this.page = value;
          })
        ).subscribe()
      }
    });
    this.dataSubscription = this.episodesService.episodes$.subscribe(data => {
      this.episodesService.getEpisodes().pipe(
        tap((data) => {
          this.episodes = data;
        })
      ).subscribe()
    });
    this.isLoadingSubscription = this.episodesService.isLoadingTerm$.subscribe(value => {
      this.episodesService.getIsLoading().pipe(
        tap((value) => {
          this.isLoading = value;
        })
      ).subscribe()
    });

    if (this.searchTerm !== "") {
      this.episodesService.updateSetFilter(true);
    } else {
      this.episodesService.updateSetFilter(false);
    };

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

}
