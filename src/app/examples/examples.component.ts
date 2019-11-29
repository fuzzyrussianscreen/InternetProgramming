import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.less']
})
export class ExamplesComponent implements OnInit {
  downloadFiles: Object;

  ngOnInit(): void {
  }

  errorMessage: string;
  filesToUpload: Array<File>;
  selectedFileNames: string[] = [];
  public isLoadingData: Boolean = false;
  uploadResult: any;
  res: Array<string>;
  myAppUrl: string = "https://localhost:44328/";
  afuConfig: any = null;

  constructor(private http: Http, private router: Router, private _FileSaverService: FileSaverService, public _http: HttpClient) {
    this.errorMessage = "";
    this.filesToUpload = [];
    this.selectedFileNames = [];
    this.uploadResult = "";
  }

  fileChangeEvent(fileInput: any) {
    this.uploadResult = "";
    this.filesToUpload = <Array<File>>fileInput.target.files;

    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.selectedFileNames.push(this.filesToUpload[i].name);
    }
  }

  cancelUpload() {
    this.filesToUpload = [];
    this.selectedFileNames = [];
    this.uploadResult = "";
    this.errorMessage = "";
  }

  upload() {
    if (this.filesToUpload.length == 0) {
      alert('Please select at least 1 files to upload!');
    }
    else if (this.filesToUpload.length > 3) {
      alert('Please select a maximum of 3 files to upload!');
    }
    else {
      this.uploadFiles();
    }
  }

  uploadFiles() {
    this.uploadResult = "";

    if (this.filesToUpload.length > 0) {
      this.isLoadingData = true;

      let formData: FormData = new FormData();

      for (var i = 0; i < this.filesToUpload.length; i++) {
        formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
      }

      let apiUrl = "http://localhost:5809/api/Upload";
      this.http.post(apiUrl, formData)
        .subscribe
        (
        data => {
          this.uploadResult = data;
          this.errorMessage = "";
        },
        err => {
          console.error(err);
          this.errorMessage = err;
          this.isLoadingData = false;
        },
        () => {
          this.isLoadingData = false,
            this.selectedFileNames = [];
          this.filesToUpload = [];
        }
        );
    }
    this.cancelUpload();
    this.cancelUpload();
  }

  downloadFile(filename: string) {
    this._http.get(this.myAppUrl + "api/DownLoadFile/" + filename,
      {
        responseType: 'blob'
      })
      .subscribe(res => {
        console.log(res);
        var blob = new Blob([res], { type: "application/octet-stream" });
        this._FileSaverService.save(blob, filename);
      },
        (error) => {
          console.log(error);
        },
        () => console.info("OK")
      );
    return false;
  }

  getAllFiles() {
    this._http.get("http://localhost:5809/api/Download/GetFiles").subscribe(res => {
      console.log(res);
      this.downloadFiles = res;
    },
      error => console.log(error)
    )
  }
}
