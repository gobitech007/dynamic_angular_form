import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField, FormSchema } from '../../models/form-schema.model';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor(private readonly fb: FormBuilder) {}

  buildForm(schema: FormSchema): FormGroup {
    const controls = schema.fields.reduce<Record<string, FormControl>>((acc, field) => {
      acc[field.name] = this.fb.control(
        { value: this.getDefaultValue(field), disabled: field.disabled },
        this.getValidators(field)
      );
      return acc;
    }, {});

    return this.fb.group(controls);
  }

  private getValidators(field: FormField) {
    const validators = [];

    if (field.required || field.validation?.required) {
      validators.push(Validators.required);
    }

    if (field.validation?.pattern) {
      validators.push(Validators.pattern(field.validation.pattern));
    }

    return validators;
  }

  private getDefaultValue(field: FormField) {
    if (field.defaultValue !== undefined) {
      return field.defaultValue;
    }

    switch (field.type) {
      case 'checkbox':
        return false;
      case 'multiselect':
        return [];
      default:
        return '';
    }
  }
}
