import { CommonModule } from '@angular/common';
import { Component, Inject  } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ToastrService, ToastrModule } from 'ngx-toastr';


@Component({
    selector: 'app-form-toastr',
    templateUrl: './form-toastr.component.html',
    standalone: true,
    imports: [MaterialModule, CommonModule],
    providers: [ToastrService]
})
export class AppFormToastrComponent {
  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
}
