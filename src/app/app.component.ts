import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { singleSpaPropsSubject } from 'src/single-spa/single-spa-props';
import { login } from '../../../microfront-demo-container/src/';


@Component({
  selector: 'mf-login',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mf-login';
  email: String = '';
  psw: String = '';

  singleSpaProps?: any;
  subscription?: Subscription;

  constructor(private ChangeDetectorRef:ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription(){
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props;
        this.lookForEvents();
      }
    );
  }

  lookForEvents(){
    this.singleSpaProps['EventBus'].on('onUserLogged', this.onUserLogged.bind(this));
  }

  onUserLogged(data: any){
    console.log("user logged listening login ", data);
  }
  
  ingresar() {
    console.log(`Ingresar Email: ${this.email} - psw: ${this.psw}`);

    login({email: this.email, pass: this.psw}).subscribe(data => {
      this.singleSpaProps['EventBus'].emit({name:'onUserLogged',data});
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
