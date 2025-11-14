import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInsightsComponent } from './form-insights.component';
import { PayloadSchema, SchemaService } from '../../shared';
import { of, throwError } from 'rxjs';
import { FormSchema } from '../../shared/models/form-schema.model';

describe('FormInsightsComponent', () => {
  let component: FormInsightsComponent;
  let fixture: ComponentFixture<FormInsightsComponent>;
  let schemaService: jasmine.SpyObj<SchemaService>;

  const mockSchemas: FormSchema[] = [
    {
      title: 'User Registration',
      description: 'Registration form',
      fields: [
        {
          label: 'Full Name',
          name: 'fullName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      title: 'Employee Registration',
      description: 'Employee onboarding form',
      fields: [
        {
          label: 'Employee ID',
          name: 'employeeId',
          type: 'text',
          required: true,
        },
      ],
    },
  ];

  beforeEach(async () => {
    const schemaServiceSpy = jasmine.createSpyObj('SchemaService', ['getSchemas', 'getSchemaById']);

    await TestBed.configureTestingModule({
      imports: [FormInsightsComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: SchemaService, useValue: schemaServiceSpy },
      ],
    }).compileComponents();

    schemaService = TestBed.inject(SchemaService) as jasmine.SpyObj<SchemaService>;
    fixture = TestBed.createComponent(FormInsightsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load schemas on init', () => {
    schemaService.getSchemas.and.returnValue(of(mockSchemas));
    fixture.detectChanges();
    expect(schemaService.getSchemas).toHaveBeenCalled();
    expect(component['schemaList']().length).toBe(2);
    expect(component['isLoading']()).toBeFalse();
  });

  it('should initialize with first schema as active after loading', () => {
    schemaService.getSchemas.and.returnValue(of(mockSchemas));
    fixture.detectChanges();
    expect(component['activeSchemaIndex']()).toBe(0);
    expect(component['activeSchema']()).toBe(mockSchemas[0]);
  });

  it('should display error when schema loading fails', () => {
    schemaService.getSchemas.and.returnValue(throwError(() => new Error('API Error')));
    fixture.detectChanges();
    expect(component['error']()).toBeTruthy();
    expect(component['isLoading']()).toBeFalse();
  });

  it('should update active schema when selectSchema is called', () => {
    schemaService.getSchemas.and.returnValue(of(mockSchemas));
    fixture.detectChanges();
    component['selectSchema'](1);
    expect(component['activeSchemaIndex']()).toBe(1);
    expect(component['activeSchema']()).toBe(mockSchemas[1]);
  });

  it('should reset lastSubmission when selectSchema is called', () => {
    schemaService.getSchemas.and.returnValue(of(mockSchemas));
    fixture.detectChanges();
    const payload: PayloadSchema = {
      fullName: 'Test',
      email: 'test@example.com',
      dob: '1990-01-01',
      gender: 'Male',
      hobbies: [],
      subscribe: true,
      about: 'Test',
    };
    component['onHandleSubmit'](payload);
    expect(component['lastSubmission']()).toEqual(payload);
    component['selectSchema'](1);
    expect(component['lastSubmission']()).toBeNull();
  });

  it('should store lastSubmission when onHandleSubmit is called', () => {
    schemaService.getSchemas.and.returnValue(of(mockSchemas));
    fixture.detectChanges();
    const payload: PayloadSchema = {
      fullName: 'Test',
      email: 'test@example.com',
      dob: '1990-01-01',
      gender: 'Male',
      hobbies: [],
      subscribe: false,
      about: 'Test submission',
    };
    component['onHandleSubmit'](payload);
    expect(component['lastSubmission']()).toEqual(payload);
  });
});
