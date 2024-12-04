// File: src/app/components/character-list/character-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  info: any = {};
  currentPage: number = 1;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.loadCharacters(this.currentPage);
    });
  }

  loadCharacters(page: number): void {
    this.rickAndMortyService.getCharacters(page).subscribe((data: any) => {
      this.characters = data.results;
      this.info = data.info;
    });
  }

  goToPage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}