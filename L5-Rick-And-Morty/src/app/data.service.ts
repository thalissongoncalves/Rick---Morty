import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RickMortyService } from './rick-morty.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private charactersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  characters$: Observable<any[]> = this.charactersSubject.asObservable();
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageTerm$: Observable<number> = this.pageSubject.asObservable();
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingTerm$: Observable<boolean> = this.isLoadingSubject.asObservable();
  private setFilterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  setFilterTerm$: Observable<boolean> = this.setFilterSubject.asObservable();
  private characters: any[] = [];
  private currentPage: number = 0;
  private allCharacters: any[] = [];
  private charactersFiltered: any[] = [];
  private pageTotal: number = 0;
  private searchTerm: string = "";

  constructor(private rickMortyFetchService: RickMortyService, private searchService: SearchService) { }

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
      this.updateIsLoading(true);
      // this.updateSetFilter(true);
      // this.allCharacters = [];
      // this.allCharactersGet(this.currentPage);
      // console.log(this.allCharacters);
      this.characters = this.allCharacters.filter((char: any) => {
        return char.name.toLowerCase().includes(this.searchTerm);
      });
      this.updateCharactersSubject(this.characters);
      //  else {
      //   window.scrollTo({ top: 0, behavior: 'instant' });
      //   // this.originCharacters = [];
      //   // this.characters = [];
      //   this.updatePage(1);
      //   this.updateSetFilter(false);
      // }

    }
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

  updateCharactersSubject(data: any[]): void {
    this.charactersSubject.next(data);
  }

  getData(): Observable<any> {
    return this.characters$;
  }

  getSetFilter(): Observable<boolean> {
    return this.setFilterTerm$;
  }

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

}
