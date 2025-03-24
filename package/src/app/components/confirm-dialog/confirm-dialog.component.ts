import { Component, ElementRef, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private elRef: ElementRef
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.elRef.nativeElement.closest('mat-dialog-container')?.removeAttribute('aria-hidden');
    }, 0);
  }

  close(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
