import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';
import { SignupComponent } from '../signup/signup.component';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-password-oublie',
  templateUrl: './password-oublie.component.html',
  styleUrls: ['./password-oublie.component.scss']
})
export class PasswordOublieComponent implements OnInit{

  passwordOublieForm: any = FormGroup;
  reponseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<PasswordOublieComponent>,
    private ngxService: NgxUiLoaderService
  ){}
  ngOnInit(): void {
    this.passwordOublieForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailExpReg)]]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.passwordOublieForm.value;
    var data = {
      email: formData.email
    }

    this.utilisateurService.passwordOublie(data).subscribe({
      next: (reponse: any) => {
        this.ngxService.stop();
        this.dialogRef.close();

        this.reponseMessage = reponse?.message;
        this.snackBarService.openSnackBar(this.reponseMessage, "");
        this.router.navigate(['/']);
      }, error: (error) => {
        console.log(error);
        this.ngxService.stop();
        if (error.error?.message) {
          this.reponseMessage = error.error?.message;
        } else {
          this.reponseMessage = GlobalConstants.genericError;
        }
        this.snackBarService.openSnackBar(this.reponseMessage, GlobalConstants.erreur)
      }
    })
  }

}
