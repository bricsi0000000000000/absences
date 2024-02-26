import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from '../@api/api-service.service';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AbsenceReasonToStringPipe } from './pipes/absenceReasonToStringPipe';
import { DateToStringPipe } from './pipes/dateToString';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AppRoutingModule} from './app-routing.module'
import { CredentialManager } from '../@api/credential-manager';

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    AbsenceReasonToStringPipe,
    DateToStringPipe,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ApiService, CredentialManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
