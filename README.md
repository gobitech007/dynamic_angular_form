# Dynamic Form Renderer (Angular)

A reusable Angular 20 component that renders complex forms at runtime from JSON schemas. It supports text inputs, textareas, dates, dropdowns, multiselects, checkboxes, validation, helper text, conditional visibility rules, and emits the structured payload on submit.

## Quick start

```bash
npm install
npm start
```

Open `http://localhost:4200` to explore the sample schemas and view emitted payloads in both the UI and browser console.

## JSON schema format

`FormSchema` objects drive the renderer (see `src/app/shared/models/form-schema.model.ts`):

```ts
{
  title: 'User Registration',
  description?: string;
  submitLabel?: string;
  fields: Array<{
    label: string;
    name: string;
    type: 'text'|'textarea'|'date'|'dropdown'|'multiselect'|'checkbox';
    placeholder?: string;
    helperText?: string;
    options?: string[];
    defaultValue?: unknown;
    required?: boolean;
    validation?: { pattern?: string; message?: string; required?: boolean };
    readonly?: boolean;
    disabled?: boolean;
    hidden?: boolean;    
    labelVisible?: boolean;
  }>
}
```
## Example output

After submitting the User Registration form the preview block shows:

```json
{
  "fullName": "Gobinath S",
  "email": "gs@gmail.com",
  "dob": "02-12-2018",
  "gender": "male",
  "hobbies": ["Reading", "Music"],
  "subscribe": true,
  "about": "First programmer."
}
```

You can adapt or load additional schemas by exporting them from `src/app/shared/models/schemas` and feeding them to the `app-dynamic-form` component. Optional enhancements like advanced conditional logic, readonly fields, or placeholder overrides can be configured entirely in JSON without touching the component. Continuous styling improvements can be applied via `src/style.scss`. 
