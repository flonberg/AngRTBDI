import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RunScriptService {
  private readonly url = 'http://localhost:3000/run-script';

  constructor(private http: HttpClient) {}

  runScript(): Observable<{ output: string }> {
    return this.http.get<{ output: string }>(this.url);
  }
}