export type FieldType = 'text' | 'textarea' | 'date' | 'dropdown' | 'multiselect' | 'checkbox';

export interface FieldValidation {
  required?: boolean;
  pattern?: string;
  message?: string;
}

export interface FormField {
  label: string;
  name: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: string[];
  defaultValue?: unknown;
  validation?: FieldValidation;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  labelVisible?: boolean;
}

export interface FormSchema {
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

export interface PayloadSchema {
  fullName: string;
  email: string;
  dob: string;
  gender: string;
  hobbies: string[];
  subscribe: boolean;
  about: string;
}

export interface SchemaList {
  id: string;
  label: string;
  summary: string;
  schema: FormSchema;
}


