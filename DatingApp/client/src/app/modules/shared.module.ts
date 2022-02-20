import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    NgxGalleryModule,
    CommonModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule,
    FileUploadModule

  ],
  declarations: [],
  exports:[
    NgxSpinnerModule,
    NgxGalleryModule,
    TabsModule,
    BsDropdownModule,
    ToastrModule,
    FileUploadModule

  ]
})
export class SharedModule { }