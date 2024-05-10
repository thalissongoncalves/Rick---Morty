import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-p',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent],
  templateUrl: './detalhes-p.component.html',
  styleUrl: './detalhes-p.component.scss'
})
export class DetalhesPComponent {
  id: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
  }
}
