import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { SimpleModalContentComponent } from './simple-modal-content/simple-modal-content.component';
import { EmployeeService } from './shared/services/employee.service';
import { InMemoryDataService }  from './in-memory-data-service';


@NgModule({
  declarations: [
    AppComponent,
    SimpleModalContentComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { delay: 1500 }
    )
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
  entryComponents: [SimpleModalContentComponent]
})
export class AppModule { }
