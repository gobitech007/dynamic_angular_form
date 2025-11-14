import { SimpleChange, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormSchema, PayloadSchema } from '../../models/form-schema.model';
import { userRegistrationSchema } from '../../schemas/form-static-schema';

const baseSchema: FormSchema = userRegistrationSchema;

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  function setSchema(schema: FormSchema = baseSchema) {
    component.schema = schema;
    component.ngOnChanges({
      schema: new SimpleChange(null, schema, true),
    });
    fixture.detectChanges();
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty state when schema is missing', () => {
    fixture.detectChanges();
    const message: HTMLElement | null = fixture.nativeElement.querySelector('.empty-state');
    expect(message?.textContent).toContain('No schema selected.');
  });

  it('should build a form when schema input changes', () => {
    setSchema();
    expect(component.form).not.toBeNull();
    const renderedFields = fixture.nativeElement.querySelectorAll('.form-field');
    expect(renderedFields.length).toBe(7);
  });

  it('should emit the submitted payload when the form is valid', () => {
    const submissions: PayloadSchema[] = [];
    component.submitted.subscribe((payload) => submissions.push(payload));
    setSchema();
    component.form?.patchValue({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      dob: '1815-12-10',
      gender: 'Female',
      hobbies: ['Reading'],
      subscribe: true,
      about: 'Pioneer in computing',
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(submissions.length).toBe(1);
    expect(submissions[0].fullName).toBe('Ada Lovelace');
    expect(submissions[0].email).toBe('ada@example.com');
    expect(submissions[0].subscribe).toBe(true);
  });

  it('should not emit when the form is invalid and should show validation errors', () => {
    const submissions: PayloadSchema[] = [];
    component.submitted.subscribe((payload) => submissions.push(payload));
    setSchema();
    component.form?.patchValue({
      fullName: '',
    });
    component.onSubmit();
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.error');
    expect(error?.textContent).toContain('Full Name is required.');
    expect(submissions.length).toBe(0);
  });
});

