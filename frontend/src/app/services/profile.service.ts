import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {Profile} from "../models/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = 'http://localhost:8000/profiles/'
  constructor(private http: HttpClient) {
  }

  getAllProfiles(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProfileById(profileId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}${profileId}/`);
  }

  deleteProfile(profileId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${profileId}/`);
  }

  updateProfile(profileId: number, ProfileData: any): Observable<Profile> {
    return this.http.patch<Profile>(`${this.apiUrl}${profileId}/`, ProfileData);
  }

  createProfile(profileData: any): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profileData);
  }
}
