import { Component, OnInit } from '@angular/core'
import { PgService } from '../services/pg-services/pg.service'
import { FormGroup, FormControl } from '@angular/forms'
import { devloginData } from './devLoginDefaults'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    host: new FormControl(devloginData.host),
    port: new FormControl(devloginData.port),
    database: new FormControl(devloginData.database),
    user: new FormControl(devloginData.user),
  })

  constructor(public pg: PgService) {}

  ngOnInit(): void {}

  onLogin() {
    this.pg.login(this.loginForm.value)
  }
}
