import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class freeApiService {
    constructor(private httpclient: HttpClient) {

    }

    getcomments(): Observable<any> {
        return this.httpclient.get("http://192.168.2.119:3000/miscale");
    }
}