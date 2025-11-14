import { CommonModule, JsonPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, computed, signal } from '@angular/core';
import { FormSchema, DynamicFormComponent, PayloadSchema, SchemaService, SchemaList } from '../../shared';


@Component({
  selector: 'app-form-insights',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, JsonPipe],
  templateUrl: './form-insights.component.html',
  styleUrl: './form-insights.component.scss',  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormInsightsComponent implements OnInit {
  
  readonly schemaList = signal<SchemaList[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  protected readonly activeSchemaIndex = signal(0);
  protected readonly lastSubmission = signal<PayloadSchema | null>(null);
  protected readonly activeSchema = computed<FormSchema | null>(
    () => this.schemaList().at(this.activeSchemaIndex())?.schema ?? null
  );

  constructor(private readonly schemaService: SchemaService) {}

  ngOnInit() {
    this.loadSchemas();
  }

  /**
   * Load schemas from the SchemaService.
   */
  private loadSchemas(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.schemaService.getSchemas().subscribe({
      next: (schemas) => {
        const examples = schemas.map((schema, index) => ({
          id: schema.title.toLowerCase().replace(/\s+/g, '-'),
          label: schema.title,
          summary: schema.description || '',
          schema,
        }));
        console.log('Fetched schemas', examples);
        this.schemaList.set(examples);
        this.activeSchemaIndex.set(0);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load schemas', err);
        this.error.set('Failed to load form schemas. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }
  public selectSchema(index: number): void {
    this.activeSchemaIndex.set(index);
    this.lastSubmission.set(null);
  }
  /**
   * 
   * @param payload returns a final dynamic form values
   */
  protected onHandleSubmit(payload: PayloadSchema): void {
    console.log('Dynamic form submission', payload);
    this.lastSubmission.set(payload);
  }

  public resetForm(): void {
    this.lastSubmission.set(null);
    this.activeSchemaIndex.set(0);
  }
}
