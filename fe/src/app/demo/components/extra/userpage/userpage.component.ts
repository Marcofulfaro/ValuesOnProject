import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/demo/service/login.service';
import { User, UserDto } from 'src/app/dto/user.dto';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputDemoModule } from '../../uikit/input/inputdemo.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { Subscriber } from 'rxjs';
import { InputMask, InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule, 
    InputDemoModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule, 
    ToastModule,
    InputMaskModule,
    PasswordModule,
  ],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.scss',
  providers: [LoginService, MessageService, ConfirmationService]
})
export class UserpageComponent implements OnInit {
  userString: string = localStorage.getItem('loggedUser')
  userdto: User | null = null
  newUser: User;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,
      private confirmationService: ConfirmationService, private messageService: MessageService, private topComponent: AppTopBarComponent,
      private router: Router) { }

  showInputField = false;
  inputData: {id: number, nome: string, cognome: string, mail: string, password: string} = { id: 0, nome: '', cognome: '', mail: '', password: ''};

  toggleInputField() {
    this.showInputField = !this.showInputField;
    if (this.showInputField) {
      this.inputData = { id: this.userdto.idUser, nome: '', cognome: '', mail: '', password: ''};
    }
  }


  confirm() {
    this.confirmationService.confirm({
        header: 'Confirmation',
        message: 'Please confirm to proceed moving forward.',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
            localStorage.removeItem('loggedUser');
            this.deleteAccount(this.userdto.idUser)
            this.router.navigate(["/auth/login"])
        },
        reject: () => {
            this.messageService.add({ severity: 'error', detail: 'Operazione Annullata', life: 3000 });
        }
    });
}

  handleInputNome(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputData.nome = target.value;
  }
  handleInputCognome(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputData.cognome = target.value;
  }
  handleInputEmail(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputData.mail = target.value;
  }
  handleInputPassword(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputData.password = target.value;
  }

  ngOnInit(): void {
    console.log(this.userString)
    this.userdto = JSON.parse(this.userString) as User;
    
  }
  deleteAccount(id: number){
    this.loginService.deleteAccount(id).subscribe();
  }

  updateInfo(){
    this.userdto.mail = this.inputData.mail
    this.userdto.nome = this.inputData.nome
    this.userdto.cognome = this.inputData.cognome
    this.userdto.password = this.inputData.password
    console.log('dto sent ', this.userdto)
    this.loginService.updateInfo(this.userdto).subscribe(
      (res) => {
        console.log(res)
        this.newUser = res,
        localStorage.setItem('loggedUser', JSON.stringify(this.newUser))
        this.userString = localStorage.getItem('loggedUser')
        this.userdto = JSON.parse(this.userString) as User;
        this.messageService.add({ severity: 'success', detail: 'Informazioni account modificate correttamente' });
      }
    )
    this.topComponent.update(this.userdto)
    this.router.navigate([this.router.url])
  }

}
