import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Material} from'./material.model'

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
    selectedMaterial : Material;
      materialList : Material[];
      constructor(private http : Http) { }

      postMaterial(emp : Material){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:44328/api/Material',body,requestOptions).map(x => x.json());
  }

  putMaterial(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:44328/api/Material/' + id,
      body,
      requestOptions).map(res => res.json());
  }

  getMaterialList(){
    this.http.get('http://localhost:44328/api/Material')
    .map((data : Response) =>{
      return data.json() as Material[];
    }).toPromise().then(x => {
      this.materialList = x;
    })
  }

  deleteMaterial(id: number) {
    return this.http.delete('http://localhost:44328/api/Material/' + id).map(res => res.json());
  }

}
