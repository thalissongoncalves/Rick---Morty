import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RickMortyService } from './rick-morty.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // reservado para armazenar os personagens da api para compartilhar com os componentes
  private charactersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  characters$: Observable<any[]> = this.charactersSubject.asObservable();
  // reservado para armazenar a página da api para compartilhar com os componentes
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageTerm$: Observable<number> = this.pageSubject.asObservable();
  // reservado para armazenar o valor para carregar novos cards no croll infinito da api para compartilhar com os componentes
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingTerm$: Observable<boolean> = this.isLoadingSubject.asObservable();
  // reservado para armazenar o valor para verificar se está filtrado ou não os cards no scroll infinito da api para compartilhar com os componentes
  private setFilterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  setFilterTerm$: Observable<boolean> = this.setFilterSubject.asObservable();
  private characters: any[] = [];
  private allCharacters: any[] = [];
  private pageTotal: number = 0;
  private page: number = 1;
  private searchTerm: string = "";
  charactersFiltered: any[] = [];

  constructor(private rickMortyFetchService: RickMortyService, private searchService: SearchService) { }

  // função para pegar os personagens e armazenar em charactersSubject para compartilhar com os components e manipular as páginas para uma exibição correta dos cards
  loadCharacters(page: number): void {
    this.updateIsLoading(true);
    if (page === 1) {
      this.characters = [];
      this.rickMortyFetchService.getCharacters(page)
      .then((data: any) => {
        this.characters = this.characters.concat(data);
        this.updateCharactersSubject(this.characters);
        this.updateIsLoading(false);
        this.updatePage(page + 1);
      })
      .catch(error => {
        console.error("Erro:", error);
        this.updateIsLoading(false);
      });
    } else {
      this.rickMortyFetchService.getCharacters(page)
      .then((data: any) => {
        this.characters = this.characters.concat(data);
        this.updateCharactersSubject(this.characters);
        this.updateIsLoading(false);
        this.updatePage(page + 1);
      })
      .catch(error => {
        console.error("Erro:", error);
        this.updateIsLoading(false);
      });
    }
  }

  // função reservada para a filtragem de personagens, recebe o valor no parametro para identificar se está sendo digitado algo no input ou não, se value for false, sobe a página pro início, atualiza a página para 1 e carrega os personagens da página 1, gerando assim um "reset" caso o input estiver vazio e se o input não tiver vazio, essa função será chamada com valor do parametro true, fazendo assim a filtragem de TODOS os personagens e atualizando o armazenamento global dos personagens para pegar no component
  updateSetFilter(value: boolean): void {
    this.setFilterSubject.next(value);
    if (value === false) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      this.updatePage(1);
      this.loadCharacters(1);
    } else if (value === true) {
      this.searchService.searchTerm$.pipe(
        tap((text) => {
          this.searchTerm = text.toLowerCase();
        })
      ).subscribe()
      this.allCharactersGet(this.page);
      this.updateIsLoading(true);
      const filteredCharacters = this.allCharacters.filter((char: any) => {
        return char.name.toLowerCase().includes(this.searchTerm);
      });
      this.charactersFiltered = [];
      filteredCharacters.forEach((character) => {
        if (!this.charactersFiltered.some((char) => char.id === character.id)) {
          this.charactersFiltered.push(character);
        }
      });
      this.updateCharactersSubject(this.charactersFiltered);
    }
  }

  // função reservada para pegar o número total de páginas e atualizar o armazenamento allCharacters com TODOS os personagens da api para utilizar para filtragem de cards
  allCharactersGet(page: number) {
    this.rickMortyFetchService.getAllCharacters(page)
      .then((data: any) => {
        this.pageTotal = data.info.pages;
        data.results.map((char: any) => {
          this.allCharacters.push(char);
        });
        if (page < this.pageTotal) {
          this.allCharactersGet(page + 1);
        }
      })
      .catch ((error) => {
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

  // função reservada para atualizar o valor do armazenamento global de personagens, para usar no component e renderizar os cards
  updateCharactersSubject(data: any[]): void {
    this.charactersSubject.next(data);
  }

  // função reservada para pegar o valor do armazenamento global de personagens, para usar no component e renderizar os cards
  getData(): Observable<any> {
    return this.characters$;
  }

  // função reservada para pegar o valor do armazenamento global de filtro, para usar no component e saber se está filtrado ou não
  getSetFilter(): Observable<boolean> {
    return this.setFilterTerm$;
  }

}
