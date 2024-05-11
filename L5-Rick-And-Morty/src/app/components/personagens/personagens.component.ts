import { Component, HostListener, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RickMortyService } from '../../rick-morty.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../../search.service';
import { Subscription, tap } from 'rxjs';
import { DataService } from '../../data.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-personagens',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent, CommonModule],
  templateUrl: './personagens.component.html',
  styleUrl: './personagens.component.scss'
})
export class PersonagensComponent implements OnInit {
  characters: any[] = [];
  page: number = 1;
  searchTerm: string = '';
  isLoading: boolean = false;
  setOrigin: boolean = true;
  filterSubscription: Subscription | undefined;
  dataSubscription: Subscription | undefined;
  pageSubscription: Subscription | undefined;
  isLoadingSubscription: Subscription | undefined;

  constructor(private rickMortyFetchService: RickMortyService, private router: Router, private searchService: SearchService, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.updatePage(this.page);
    this.dataService.loadCharacters(this.page);
    this.dataService.updateIsLoading(this.isLoading);
    
    this.pageSubscription = this.dataService.pageTerm$.subscribe(page => {
      if (page !== 0) {
        this.dataService.getPageTerm().pipe(
          tap((value) => {
            this.page = value;
          })
        ).subscribe()
        console.log("Page: " + this.page);
      }
    });
    this.dataSubscription = this.dataService.characters$.subscribe(data => {
      this.dataService.getData().pipe(
        tap((data) => {
          this.characters = data;
        })
      ).subscribe()
      console.log("Characters: " + this.characters.length);
    });
    this.isLoadingSubscription = this.dataService.isLoadingTerm$.subscribe(value => {
      this.isLoading = value;
    });

    this.registerScrollListener();
  }

  registerScrollListener(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) {
      if (!this.isLoading) {
        this.dataService.loadCharacters(this.page);
      }
    }
  }

  changeCharacterId(id: number) {
    this.router.navigateByUrl(`/personagens/${id}`);
  }
  
}
