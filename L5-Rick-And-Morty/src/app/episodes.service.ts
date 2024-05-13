import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RickMortyService } from './rick-morty.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  // reservado para armazenar os episódios da api para compartilhar com os componentes
  private episodesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  episodes$: Observable<any[]> = this.episodesSubject.asObservable();
  // reservado para armazenar a página da api para compartilhar com os componentes
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageTerm$: Observable<number> = this.pageSubject.asObservable();
  // reservado para armazenar o valor para carregar novos cards no croll infinito da api para compartilhar com os componentes
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingTerm$: Observable<boolean> = this.isLoadingSubject.asObservable();
  // reservado para armazenar o valor para verificar se está filtrado ou não os cards no scroll infinito da api para compartilhar com os componentes
  private setFilterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  setFilterTerm$: Observable<boolean> = this.setFilterSubject.asObservable();
  private episodes: any[] = [];
  private allEpisodes: any[] = [];
  private episodesFiltered: any[] = [];
  private pageTotal: number = 0;
  private searchTerm: string = "";
  private page: number = 1;

  constructor(private rickMortyFetchService: RickMortyService, private searchService: SearchService) { }

  // função para pegar os episódios e armazenar em episodesSubject para compartilhar com os components e manipular as páginas para uma exibição correta dos cards
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

  // função reservada para a filtragem de episódios, recebe o valor no parametro para identificar se está sendo digitado algo no input ou não, se value for false, sobe a página pro início, atualiza a página para 1 e carrega os episódios da página 1, gerando assim um "reset" caso o input estiver vazio e se o input não tiver vazio, essa função será chamada com valor do parametro true, fazendo assim a filtragem de TODOS os episódios e atualizando o armazenamento global dos episódios para pegar no component
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
      })
      ).subscribe()
      this.allEpisodesGet(this.page);
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
    }
  }

  // função reservada para pegar o número total de páginas e atualizar o armazenamento allEpisodes com TODOS os episódios da api para utilizar para filtragem de cards
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

  // função reservada para atualizar o armazenamento do número da página
  updatePage(page: number): void {
    this.pageSubject.next(page);
  }

  // função reservada para pegar o valor do armazenamento do número da página
  getPageTerm(): Observable<number> {
    return this.pageTerm$;
  }

  // função reservada para atualizar o valor do isLoading, serve para manipular o scroll infinito dos cards
  updateIsLoading(value: boolean): void {
    this.isLoadingSubject.next(value);
  }

  // função reservada para pegar o valor do isLoading, serve para manipular o scroll infinito dos cards
  getIsLoading(): Observable<boolean> {
    return this.isLoadingTerm$;
  }

  // função reservada para atualizar o valor do armazenamento global de episódios, para usar no component e renderizar os cards
  updateEpisodesSubject(data: any[]): void {
    this.episodesSubject.next(data);
  }

  // função reservada para pegar o valor do armazenamento global de episódios, para usar no component e renderizar os cards
  getEpisodes(): Observable<any> {
    return this.episodes$;
  }

  // função reservada para pegar o valor do armazenamento global de filtro, para usar no component e saber se está filtrado ou não
  getSetFilter(): Observable<boolean> {
    return this.setFilterTerm$;
  }

}
