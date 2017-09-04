import { Injectable } from '@angular/core';
import { JwtHelper, AuthHttp } from "angular2-jwt";
import { AuthService } from "../../providers/auth/auth-service";
import { API } from "../../config";
import { User } from "../../app/model/user";
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  data: User;
  user: User;

  constructor(private readonly authService: AuthService,
              private readonly jwtHelper: JwtHelper,
              private readonly  authHttp: AuthHttp) {
    this.authService.authUser.subscribe(jwt => {
      if (jwt) {
        console.log('JSON of JWT: ' + JSON.stringify(jwt));
        const decoded = this.jwtHelper.decodeToken(jwt);
        this.user =  JSON.parse( decoded.sub );
        console.log('Decoded user object: ' +  (this.user ? this.user.name : this.user));
      }
      else {
        console.log('User null: ' + this.user);
        this.user = null;
      }
    });

  }

  save(user: User): Observable<any> {
    let result: Observable<Response>;

    result = this.authHttp.put(`${API}/user/` + user.username, user);
   
    return result
      .map((response: Response) => console.log(response))
      .catch(error => Observable.throw(error));      
  }

  getCurrentUser() {
    return this.user;
  }

  ionViewWillEnter() {
   
  }

  getAuthenticatedUserInfo() {
    this.authHttp.get(`${API}/user/` + this.user.username)
          .subscribe((data) => {
            console.log(data)
          });
        }

}
