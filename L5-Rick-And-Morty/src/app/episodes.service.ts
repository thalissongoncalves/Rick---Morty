import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RickMortyService } from './rick-morty.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  private episodesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  episodes$: Observable<any[]> = this.episodesSubject.asObservable();
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageTerm$: Observable<number> = this.pageSubject.asObservable();
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingTerm$: Observable<boolean> = this.isLoadingSubject.asObservable();
  private setFilterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  setFilterTerm$: Observable<boolean> = this.setFilterSubject.asObservable();
  private episodes: any[] = [];
  private allEpisodes: any[] = [];
  private episodesFiltered: any[] = [];
  private pageTotal: number = 0;
  private searchTerm: string = "";

  constructor(private rickMortyFetchService: RickMortyService, private searchService: SearchService) { }

  loadEpisodes(page: number): void {
    this.updateIsLoading(true);
    if (page === 1) {
      this.episodes = [];
      this.rickMortyFetchService.getEpisodies(page)
      .then((data: any) => {
        this.episodes = this.episodes.concat(data);
        this.updateEpisodesSubject(this.episodes);
        this.updateIsLoading(false);
        this.updatePage(page + 1);
      })
      .catch(error => {
        console.error("Erro:", error);
        this.updateIsLoading(false);
      });
    } else {
      this.rickMortyFetchService.getEpisodies(page)
      .then((data: any) => {
        this.episodes = this.episodes.concat(data);
        this.updateEpisodesSubject(this.episodes);
        this.updateIsLoading(false);
        this.updatePage(page + 1);
      })
      .catch(error => {
        console.error("Erro:", error);
        this.updateIsLoading(false);
      });
    }
    
  }

  updateSetFilter(value: boolean): void {
    this.setFilterSubject.next(value);
    if (value === false) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      this.updatePage(1);
      this.loadEpisodes(1);
    } else if (value === true) {
      this.searchService.searchTerm$.pipe(
        tap((text) => {
          this.searchTerm = text.toLowerCase();
          this.updateIsLoading(true);
          const filteredEpisodes = this.allEpisodes.filter((ep: any) => {
            return ep.name.toLowerCase().includes(this.searchTerm);
          });
          this.episodesFiltered = [];
          filteredEpisodes.forEach((episode) => {
            if (!this.episodesFiltered.some((ep) => ep.id === episode.id)) {
              this.episodesFiltered.push(episode);
            }
          });
          this.updateEpisodesSubject(this.episodesFiltered);
      })
      ).subscribe()
    }
  }

  allEpisodesGet(page: number) {
    this.rickMortyFetchService.getAllEpisodes(page)
      .then((data: any) => {
        this.pageTotal = data.info.pages;
        data.results.map((ep: any) => {
          this.allEpisodes.push(ep);
        });
        if (page < this.pageTotal) {
          this.allEpisodesGet(page + 1);
        }
      })
      .catch ((error: any) => {
        console.error("Erro:", error);
      });
  }

  updatePage(page: number): void {
    this.pageSubject.next(page);
  }

  getPageTerm(): Observable<number> {
    return this.pageTerm$;
  }

  updateIsLoading(value: boolean): void {
    this.isLoadingSubject.next(value);
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoadingTerm$;
  }

  updateEpisodesSubject(data: any[]): void {
    this.episodesSubject.next(data);
  }

  getEpisodes(): Observable<any> {
    return this.episodes$;
  }

  getSetFilter(): Observable<boolean> {
    return this.setFilterTerm$;
  }

}
