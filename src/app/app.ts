import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent, FooterComponent } from './shared/components';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App implements OnInit {  
  
  constructor(private readonly titleService: Title, private readonly meta: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Dynamic Form Renderer');
    this.meta.updateTag({
      name: 'description',
      content: 'Reusable dynamic form renderer powered by JSON schemas.',
    });
  }
}
