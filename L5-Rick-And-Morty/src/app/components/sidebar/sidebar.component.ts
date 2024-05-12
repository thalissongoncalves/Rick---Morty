import { Component } from '@angular/core';
import { SearchService } from '../../search.service';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from '../../rick-morty.service';
import { PersonagensComponent } from '../personagens/personagens.component';
import { Subscription, map, take, tap } from 'rxjs';
import { DataService } from '../../data.service';
import { EpisodesService } from '../../episodes.service';

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
  
  constructor(private searchService: SearchService, private dataService: DataService, private episodeService: EpisodesService) {}

  ngOnInit(): void {
    this.pageSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchService.getSearchTerm().pipe(
        tap((text) => {
          this.searchTerm = text;
        })
      ).subscribe()
    });
  }

  updateSearchTerm() {
    this.searchService.updateSearchTerm(this.searchTerm);
    if (this.searchTerm === "") {
      this.dataService.updateSetFilter(false);
      this.episodeService.updateSetFilter(false);
    } else {
      this.dataService.updateSetFilter(true);
      this.episodeService.updateSetFilter(true);
    }
  }

}
