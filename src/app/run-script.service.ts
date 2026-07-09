import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RunScriptService {
  private readonly url = 'http://localhost:3000/run-script';

  constructor(private http: HttpClient) {}

  runScript(i: number, value: string): Observable<{ output: string }> {
    return this.http.post<{ output: string }>(this.url, { i, value });
  }
}