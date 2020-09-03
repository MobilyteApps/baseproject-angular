import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessages } from './components/control-messages/control-messages.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './intercepters/token.intercepter';
import { ApiIntercepter } from './intercepters/api.interceptor';
import { HttpErrorInterceptor } from './intercepters/HttpErrorInterceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterComponent } from './components/toaster/toaster-component';
import { ToasterContainerComponent } from './components/toaster/toaster-container-component';



@NgModule({
  declarations: [ControlMessages, ToasterComponent, ToasterContainerComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiIntercepter,
      multi: true
    }
  ],
  exports: [ControlMessages, ToasterComponent, ToasterContainerComponent]
})
export class ShareModule { }
