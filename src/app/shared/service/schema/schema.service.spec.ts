import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { SchemaService } from './schema.service';
import { FormSchema } from '../../models/form-schema.model';

describe('SchemaService', () => {
  let service: SchemaService;
  let httpMock: HttpTestingController;

  const mockSchema: FormSchema = {
    title: 'Test Schema',
    fields: [
      {
        label: 'Full Name',
        name: 'fullName',
        type: 'text',
        required: true,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideZonelessChangeDetection(), SchemaService],
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

  it('should fetch schemas from API', () => {
    const mockSchemas: FormSchema[] = [mockSchema];

    service.getSchemas().subscribe((schemas) => {
      expect(schemas.length).toBe(1);
      expect(schemas[0]).toEqual(mockSchema);
    });

    const req = httpMock.expectOne('/api/schemas');
    expect(req.request.method).toBe('GET');
    req.flush(mockSchemas);
  });

  it('should fetch schema by id from API', () => {
    const schemaId = 'test-schema-1';

    service.getSchemaById(schemaId).subscribe((schema) => {
      expect(schema).toEqual(mockSchema);
    });

    const req = httpMock.expectOne(`/api/schemas/${schemaId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSchema);
  });
});
