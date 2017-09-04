import { API } from "../config";
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from "../providers/auth/auth-service";
import { JwtHelper, AuthHttp} from "angular2-jwt";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class CrudService {
  public CRUD_API;

  constructor(private readonly authService: AuthService,
              private readonly jwtHelper: JwtHelper,
              private readonly  authHttp: AuthHttp) {
    this.CRUD_API = API + '/cruds';    
  }

  getCruds(): Observable<any> {
    return this.authHttp.get(this.CRUD_API + '/all')
      .map((response: Response) => response.json());
  }

  get(id: string) {
    return this.authHttp.get(this.CRUD_API + '/' + id)
      .map((response: Response) => response.json());
  }

  save(crud: any): Observable<any> {
    let result: Observable<Response>;
    if (crud['href']) {
      result = this.authHttp.put(crud.href, crud);
    } else {
      result = this.authHttp.post(this.CRUD_API, crud)
    }
    return result.map((response: Response) => response.json())
      .catch(error => Observable.throw(error));
  }

  remove(id: string) {
    console.log(id);
    return this.authHttp.delete(this.CRUD_API + '/' + id).subscribe((ok)=>{console.log(ok)}); 
  }
}
