import { Component, HostListener } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RickMortyService } from '../../rick-morty.service';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { SearchService } from '../../search.service';
import { LocationsService } from '../../locations.service';
import { FavoriteService } from '../../favorite.service';

@Component({
  selector: 'app-localizacoes',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent, CommonModule],
  templateUrl: './localizacoes.component.html',
  styleUrl: './localizacoes.component.scss'
})
export class LocalizacoesComponent {
  locations: any[] = [];
  isLoading: boolean = false;
  page: number = 1;
  searchTerm: string = "";
  filterSubscription: Subscription | undefined;
  pageSubscription: Subscription | undefined;
  dataSubscription: Subscription | undefined;
  isLoadingSubscription: Subscription | undefined;
  searchTermSubscription: Subscription | undefined;

  constructor(private router: Router, private searchService: SearchService, private locationService: LocationsService, private favoriteService: FavoriteService) {}

  // Ao carregar a página, carrega todas as localizações, atualiza o número da página atual da api global, atualiza o isLoading para o scroll infinito, atualiza o searchTerm buscando-o globalmente, faz a verificação do searchTerm para filtragem de cards, atualiza o número da página atual do component, atualiza o isLoading
  ngOnInit(): void {
    this.locationService.allLocationsGet(this.page);
    this.locationService.updatePage(this.page);
    this.locationService.updateIsLoading(this.isLoading);

    this.searchService.searchTerm$.subscribe(value => {
      this.searchService.getSearchTerm().pipe(
        tap((text) => {
          this.searchTerm = text;
        })
      ).subscribe()
    });

    if (this.searchTerm !== "") {
      this.locationService.updateSetFilter(true);
      this.locationService.locations$.subscribe(data => {
        this.locationService.getLocations().pipe(
          tap((data) => {
            this.locations = data;
          })
        ).subscribe()
      })
    } else {
      this.locationService.updateSetFilter(false);
      this.locationService.locations$.subscribe(data => {
        this.locationService.getLocations().pipe(
          tap((data) => {
            this.locations = data;
          })
        ).subscribe()
      });
    };

    this.locationService.pageTerm$.subscribe(page => {
      if (page !== 0) {
        this.locationService.getPageTerm().pipe(
          tap((value) => {
            this.page = value;
          })
        ).subscribe()
      }
    });

    this.locationService.isLoadingTerm$.subscribe(value => {
      this.locationService.getIsLoading().pipe(
        tap((value) => {
          this.isLoading = value;
        })
      ).subscribe()
    });

    this.registerScrollListener();
  }

  // serve para monitorar o scroll do mouse
  registerScrollListener(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  // quando o scroll do mouse chega no final da página, ele carrega novos cards baseado na página atual do component
  onScroll(): void {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) {
      if (!this.isLoading) {
        this.locationService.loadLocations(this.page);
      }
    }
  }

  // serve para mudar de página baseado no id da localização selecionado
  changeLocationId(id: number) {
    this.router.navigateByUrl(`/localizacoes/${id}`);
  }

  // serve para favoritar a localização, atualizando no favoriteService com o valor do card id, name e type
  favoriteLocation(id: number, name: string, type: string): void {
    this.favoriteService.updateLocationsFavorite({id, name, type});
  }
}
