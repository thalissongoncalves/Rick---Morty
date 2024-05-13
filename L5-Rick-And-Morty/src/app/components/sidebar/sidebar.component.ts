import { Component } from '@angular/core';
import { SearchService } from '../../search.service';
import { FormsModule } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { DataService } from '../../data.service';
import { EpisodesService } from '../../episodes.service';
import { LocationsService } from '../../locations.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  searchTerm: string = "";
  pageSubscription: Subscription | undefined;
  
  constructor(private searchService: SearchService, private dataService: DataService, private episodeService: EpisodesService, private locationService: LocationsService) {}

  ngOnInit(): void {
    this.pageSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchService.getSearchTerm().pipe(
        tap((text) => {
          this.searchTerm = text;
        })
      ).subscribe()
    });
  }

  // função para atualizar o valor global do searchTerm que armazena o valor do input para manipulação de outros componentes para renderizar os cards filtrados e toda vez que tem alguma digitação no input chamando as funções de filtragem de cards de cada serviço para manipulação dos dados
  updateSearchTerm() {
    this.searchService.updateSearchTerm(this.searchTerm);
    if (this.searchTerm === "") {
      this.dataService.updateSetFilter(false);
      this.episodeService.updateSetFilter(false);
      this.locationService.updateSetFilter(false);
    } else {
      this.dataService.updateSetFilter(true);
      this.episodeService.updateSetFilter(true);
      this.locationService.updateSetFilter(true);
    }
  }

}
