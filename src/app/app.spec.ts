import { Meta, Title } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), Title, Meta]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the header and footer components', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('app-header'));
    const footer = fixture.debugElement.query(By.css('app-footer'));
    expect(header).not.toBeNull();
    expect(footer).not.toBeNull();
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).not.toBeNull();
  });

  it('should set the page title', () => {
    const titleService = TestBed.inject(Title);
    spyOn(titleService, 'setTitle');
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(titleService.setTitle).toHaveBeenCalledWith('Dynamic Form Renderer');
  });

  it('should update the meta description tag', () => {
    const metaService = TestBed.inject(Meta);
    spyOn(metaService, 'updateTag');
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Reusable dynamic form renderer powered by JSON schemas.',
    });
  });
});
