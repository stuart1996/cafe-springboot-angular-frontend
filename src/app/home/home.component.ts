import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { PasswordOublieComponent } from '../password-oublie/password-oublie.component';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleSignupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent, dialogConfig);
  }

  handlePasswordOublieAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    this.dialog.open(PasswordOublieComponent, dialogConfig);
  }

  handleLoginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
