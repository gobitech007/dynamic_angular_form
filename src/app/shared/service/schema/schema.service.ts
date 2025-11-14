import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormSchema } from '../../models/form-schema.model';
import { employeeRegistrationSchema, userRegistrationSchema } from '../../schemas';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {

  getSchemas(): Observable<FormSchema[]> {
    return of([userRegistrationSchema, employeeRegistrationSchema]);
  }

  getSchemaById(id: string): Observable<FormSchema> {
    return of(userRegistrationSchema);
  }
}
