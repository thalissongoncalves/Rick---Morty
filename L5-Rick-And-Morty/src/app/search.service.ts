import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Terms reservado para armazenar o valor do input de filtragem
  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();

  constructor() { }

  // função para atualizar o valor do termo reservado para armazenar o valor do input de filtragem
  updateSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  // função para pegar o valor do termo reservado de armazenagem do valor do input de filtragem
  getSearchTerm(): Observable<string> {
    return this.searchTerm$;
  }
}
