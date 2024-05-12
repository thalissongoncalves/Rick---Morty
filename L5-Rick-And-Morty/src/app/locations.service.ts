import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RickMortyService } from './rick-morty.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private locationsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  locations$: Observable<any[]> = this.locationsSubject.asObservable();
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageTerm$: Observable<number> = this.pageSubject.asObservable();
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingTerm$: Observable<boolean> = this.isLoadingSubject.asObservable();
  private setFilterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  setFilterTerm$: Observable<boolean> = this.setFilterSubject.asObservable();
  private locations: any[] = [];
  private allLocations: any[] = [];
  private locationsFiltered: any[] = [];
  private pageTotal: number = 0;
  private searchTerm: string = "";
  private page: number = 1;

  constructor(private rickMortyFetchService: RickMortyService, private searchService: SearchService) { }

  loadLocations(page: number): void {
    this.updateIsLoading(true);
    if (page === 1) {
      this.locations = [];
      this.rickMortyFetchService.getLocations(page)
      .then((data: any) => {
        this.locations = this.locations.concat(data);
        this.updateLocationsSubject(this.locations);
        this.updateIsLoading(false);
        this.updatePage(page + 1);
      })
      .catch(error => {
        console.error("Erro:", error);
        this.updateIsLoading(false);
      });
    } else {
      this.rickMortyFetchService.getLocations(page)
      .then((data: any) => {
        this.locations = this.locations.concat(data);
        this.updateLocationsSubject(this.locations);
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
      this.loadLocations(1);
    } else if (value === true) {
      this.searchService.searchTerm$.pipe(
        tap((text) => {
          this.searchTerm = text.toLowerCase();
      })
      ).subscribe()
      this.allLocationsGet(this.page);
      this.updateIsLoading(true);
      const filteredLocations = this.allLocations.filter((ep: any) => {
        return ep.name.toLowerCase().includes(this.searchTerm);
      });
      this.locationsFiltered = [];
      filteredLocations.forEach((location) => {
        if (!this.locationsFiltered.some((ep) => ep.id === location.id)) {
          this.locationsFiltered.push(location);
        }
      });
      this.updateLocationsSubject(this.locationsFiltered);
    }
  }

  allLocationsGet(page: number) {
    this.rickMortyFetchService.getAllLocations(page)
      .then((data: any) => {
        this.pageTotal = data.info.pages;
        data.results.map((ep: any) => {
          this.allLocations.push(ep);
        });
        if (page < this.pageTotal) {
          this.allLocationsGet(page + 1);
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

  updateLocationsSubject(data: any[]): void {
    this.locationsSubject.next(data);
  }

  getLocations(): Observable<any> {
    return this.locations$;
  }

  getSetFilter(): Observable<boolean> {
    return this.setFilterTerm$;
  }
}
