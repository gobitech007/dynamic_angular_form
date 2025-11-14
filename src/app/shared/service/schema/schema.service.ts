import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FormSchema } from '../../models/form-schema.model';
import { employeeRegistrationSchema, userRegistrationSchema } from '../../schemas';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  private readonly apiUrl = '/api/schemas';

  constructor(private readonly http: HttpClient) {}

  getSchemas(): Observable<FormSchema[]> {
    // return this.http.get<FormSchema[]>(this.apiUrl);
    return of([userRegistrationSchema, employeeRegistrationSchema]);
  }

  getSchemaById(id: string): Observable<FormSchema> {
    // return this.http.get<FormSchema>(`${this.apiUrl}/${id}`);
    return of(userRegistrationSchema);
  }
}
