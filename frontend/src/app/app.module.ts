import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from '../@api/api-service.service';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AbsenceReasonToStringPipe } from './pipes/absenceReasonToStringPipe';
import { DateToStringPipe } from './pipes/dateToString';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    AbsenceReasonToStringPipe,
    DateToStringPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
