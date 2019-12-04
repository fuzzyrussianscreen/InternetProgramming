import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from './material.model'

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  selectedMaterial: Material;
  materialList: Material[];
  url = 'https://localhost:44328/api/Materials';
  constructor(private http: HttpClient) { }
  getAllMaterial(): Observable<Material[]> {
    return this.http.get<Material[]>(this.url);
  }
  getMaterialById(Id: number): Observable<Material> {
    return this.http.get<Material>(this.url + "/" + Id);
  }
  postMaterial(Material: Material): Observable<Material> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Material>(this.url, Material, httpOptions);
  }
  putMaterial(Id: number, Material: Material): Observable<Material> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Material>(this.url + "/" + Id, Material, httpOptions);
  }
  deleteMaterialById(Id: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + "/" + Id, httpOptions);
  }

  dropbox = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer WCgqYwN1F-AAAAAAAAAAFUKF3K-QsioBlAgR8_z9moxLkOjWbpD6RR9volG_7zXf',
      'Content-Type': 'application/json'
    })
  };

  getResult(text: string): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const data: any = {
      "text": text
    };
    return this.http
      .post('https://localhost:44328/api/SearchMaterials/?text=' + text, <JSON>data, httpOptions)

  }

  addImages(Material: Material, Id: string, mode: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const formData: FormData = new FormData();
    const room_id = new Blob([JSON.stringify(Id)], {
      type: 'application/json'
    });
    const img_mode = new Blob([JSON.stringify(mode)], {
      type: 'application/json'
    });
    formData.append(Id, room_id);
    formData.append(mode, img_mode);
    for (var i = 0; i < Material.images_files.length; i++) {
      formData.append('images_files_' + i, Material.images_files[i]);
    }
    return this.http.post('https://localhost:44328/api/upload_to_dropbox', formData, httpOptions);
  }

  getImage(path: string): Observable<any> {
    const data: any = {
      "path": path
    };

    return this.http.post('https://api.dropboxapi.com/2/files/get_temporary_link', <JSON>data, this.dropbox);
  }
}
