import { BrowserModule } from'@angular/platform-browser';
import { NgModule, ErrorHandler } from'@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from'ionic-angular';
import { App } from'./app.component';
import { AboutPage  } from'../pages/about/about';
import { HomePage  } from'../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CrudPage } from '../pages/crud/crud';
import { StatusBar } from'@ionic-native/status-bar';
import { SplashScreen } from'@ionic-native/splash-screen';
import { LoginPage } from"../pages/login/login";
import { UserPage } from"../pages/user/user";
import { SignupPage } from"../pages/signup/signup";
import { CrudService } from'../providers/crud-service';
import { CrudModalPage } from '../pages/crud/crud-modal';
import { CustomFormsModule } from'ng2-validation'
import { Storage, IonicStorageModule } from"@ionic/storage";
import { JwtHelper, AuthConfig, AuthHttp } from"angular2-jwt";
import { Http, HttpModule, RequestOptions } from"@angular/http";
import { AuthService } from"../providers/auth/auth-service";
import { UserService  } from"../providers/user/user-service";

// AuthHttp factory that makes use of jwt-token
export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    tokenGetter: (() => storage.get('jwt')),
  });
  return new AuthHttp(authConfig, http, options);
}

@NgModule({
  declarations: [
    App,
   	LoginPage,
     UserPage,
    SignupPage,
    AboutPage,
    HomePage,
    TabsPage,
    CrudPage,
    CrudModalPage    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(App),
    IonicStorageModule.forRoot({
      name: 'spring-boot-ionic-login-jwt-crud-app',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    CustomFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
	LoginPage,
  UserPage,
    SignupPage,
    AboutPage,
    HomePage,
    TabsPage,    
    CrudPage,
    CrudModalPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    StatusBar,
	SplashScreen,
	AuthService,
    UserService,
	CrudService, 
    JwtHelper, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    }]
})
export class AppModule {}
