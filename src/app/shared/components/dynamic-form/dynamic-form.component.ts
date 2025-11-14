import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField, FormSchema, PayloadSchema } from '../../models/form-schema.model';
import { FormBuilderService } from '../../service/form-builder/form-builder-service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnChanges {
  @Input() schema: FormSchema | null = null;
  @Output() submitted = new EventEmitter<PayloadSchema>();

  form: FormGroup | null = null;

  constructor(private readonly formBuilder: FormBuilderService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['schema'] && this.schema) {
      this.form = this.formBuilder.buildForm(this.schema);
    }
  }

  /**
   * TrackBy function for ngFor loop.
   *
   * @param index Index of the item.
   * @param item Item being iterated over.
   */
  trackByField(_: number, field: FormField) {
    return field.name;
  }

  /**
   * Check whether a field should be displayed based on visibility rules.
   *
   * @param field Field to check.
   */
  isFieldVisible(field: FormField): boolean {
    if (field.hidden) {
      return false;
    }

    if (!field.visibleWhen || !this.form) {
      return true;
    }

    const controllingValue = this.form.get(field.visibleWhen.field)?.value;
    if (Array.isArray(controllingValue)) {
      return controllingValue.includes(field.visibleWhen.equals);
    }

    return controllingValue === field.visibleWhen.equals;
  }
  
  /**
   * 
   * @param field 
   * @returns error message | null
   */
  getErrorMessage(field: FormField): string | null {
    if (!this.form) {
      return null;
    }

    const control = this.form.get(field.name);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.hasError('required')) {
      return  `${field.label} is required.`;
    }

    if (control.hasError('pattern')) {
      return field.validation?.message ?? `${field.label} format is invalid.`;
    }

    return 'Invalid value';
  }

  public onSubmit(): void {
    if (!this.form) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as PayloadSchema;
    this.submitted.emit(payload);
  }
}


