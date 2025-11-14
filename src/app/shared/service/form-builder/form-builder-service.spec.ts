import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilderService } from './form-builder-service';
import { FormSchema } from '../../models/form-schema.model';

const baseSchema: FormSchema = {
  title: 'Test Schema',
  submitLabel: 'Save',
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      validation: {
        pattern: '^[^@]+@[^@]+$',
        message: 'Invalid email',
      },
    },
    {
      name: 'subscribe',
      label: 'Subscribe',
      type: 'checkbox',
    },
    {
      name: 'about',
      label: 'About',
      type: 'textarea'
    },
  ],
};

describe('FormBuilderService', () => {
  let service: FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(FormBuilderService);
  });

  it('should create a form group with controls for each field', () => {
    const form = service.buildForm(baseSchema);
    expect(form.contains('fullName')).toBeTrue();
    expect(form.contains('email')).toBeTrue();
    expect(form.contains('subscribe')).toBeTrue();
    expect(form.contains('about')).toBeTrue();
  });

  it('should apply default values based on field type', () => {
    const form = service.buildForm(baseSchema);
    expect(form.get('fullName')?.value).toBe('');
    expect(form.get('subscribe')?.value).toBeFalse();
    expect(form.get('about')?.value).toEqual('');
  });

  it('should configure validators for required and pattern fields', () => {
    const form = service.buildForm(baseSchema);
    const fullName = form.get('fullName');
    fullName?.setValue('');
    fullName?.markAsTouched();
    expect(fullName?.hasError('required')).toBeTrue();

    const email = form.get('email');
    email?.setValue('invalid');
    email?.markAsTouched();
    expect(email?.hasError('pattern')).toBeTrue();
  });
});
