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

  /**
   * 
   * @returns form submission validation and emit payload
   */
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
  public resetForm(): void {
    if (this.form) {
      this.form.reset();
    }
  }
}


