import { API } from "../../config";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ReplaySubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { JwtHelper, AuthHttp } from "angular2-jwt";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {

  authUser = new ReplaySubject<any>(1);

  constructor(private readonly http: Http,
              private readonly authHttp: AuthHttp,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelper) {
  }

  performAuthentication() {
    this.storage.get('jwt').then(jwt => {
	    // checks if the tokes expired and reconfirms the access
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.authHttp.get(`${API}/authenticate`)
        .subscribe(() => this.authUser.next(jwt), 
          (err) => this.storage.remove('jwt').then(() => this.authUser.next(null)));
      } else {
        if (!jwt){
        console.log("Token is null!");  
        } else {
          console.log("Token has expired!");
        }
        this.storage.remove('jwt').then(() => this.authUser.next(null));
      }
    });
  }

  login(values: any): Observable<any> {
    return this.http.post(`${API}/login`, values)
      .map(response => response.text())
      .map(jwt => this.handleJwtResponse(jwt));
  }

  logout() {
    this.storage.remove('jwt').then(() => this.authUser.next(null));
  }

  signup(values: any): Observable<any> {
    return this.http.post(`${API}/signup`, values)
      .map(response => response.text())
      .map(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt);
        }
        else {
          return jwt;
        }
      });
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set('jwt', jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }

}