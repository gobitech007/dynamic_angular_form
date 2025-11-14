import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SchemaService } from './schema.service';

describe('SchemaService', () => {
  let service: SchemaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting(), SchemaService],
    });
    service = TestBed.inject(SchemaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch schema from API', () => {

    service.getSchemas().subscribe((schemas) => {
      expect(schemas).toBeDefined();
      expect(schemas.length).toBeGreaterThan(0);
    });
  });
});
