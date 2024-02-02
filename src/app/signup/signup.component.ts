import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  password = true;
  confirmationPassword = true;
  signUpForm: any = FormGroup;
  reponseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.pattern(GlobalConstants.nomExpReg)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailExpReg)]],
      telephone: [null, [Validators.required, Validators.pattern(GlobalConstants.telephoneExpReg)]],
      password: [null, [Validators.required]],
      confirmationPassword: [null, [Validators.required]]
    })
  }

  validateSubmit() {
    if (this.signUpForm.controls['password'].value != this.signUpForm.controls['confirmationPassword'].value) {
      return true;
    } else {
      return false;
    }
  }
  handleSubmit() {
    this.ngxService.start();
    var formData = this.signUpForm.value;
    var data = {
      nomComplet: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      password: formData.password
    }

    this.utilisateurService.signUp(data).subscribe({
      next: (reponse: any) => {
        this.ngxService.stop();
        this.dialogRef.close();

        this.reponseMessage = reponse?.message;
        this.snackBarService.openSnackBar(this.reponseMessage, " ");
        this.router.navigate(['/']);
      }, error: (error) => {
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
