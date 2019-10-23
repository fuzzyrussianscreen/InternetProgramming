import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from'./material.model'

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
    selectedMaterial : Material;
    materialList : Material[];
    url = 'https://localhost:44328/api/Materials';
    constructor(private http: HttpClient) { }
    getAllMaterial(): Observable<Material[]> {
    return this.http.get<Material[]>(this.url);
  }
  getMaterialById(Id: number): Observable<Material> {
    return this.http.get<Material>(this.url + "/" + Id);
  }
  postMaterial(Material: Material): Observable<Material> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Material>(this.url, Material, httpOptions);
  }
  putMaterial(Id: number, Material: Material): Observable<Material> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Material>(this.url + "/" + Id, Material, httpOptions);
  }
  deleteMaterialById(Id: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<number>(this.url + "/" + Id, httpOptions);
  }

}
