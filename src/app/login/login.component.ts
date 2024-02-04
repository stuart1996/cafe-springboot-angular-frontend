import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PasswordOublieComponent } from '../password-oublie/password-oublie.component';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm: any = FormGroup;
  reponseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService
  ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailExpReg)]],
      password: [null, [Validators.required]]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }

    this.utilisateurService.login(data).subscribe({
      next: (reponse: any) => {
        this.ngxService.stop();
        this.dialogRef.close();

        localStorage.setItem('token', reponse.token)

        this.router.navigate(['/cafe/dashboard']);
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
