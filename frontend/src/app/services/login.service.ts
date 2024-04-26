import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Token} from "../models/token.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BASE_URL = 'http://localhost:8000'


  constructor(private http : HttpClient) { }
  login(username: string, password: string) {
    return this.http.post<Token>(`${
        this.BASE_URL}/api/token/`,
      {username, password})
  }

}
