import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationService as CsPrimeng, MessageService as MsPrimeng } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast/';
// tslint:disable-next-line:max-line-length
import { RestricaoEntidadeComponent } from './components/restricao/restricao-entidade/restricao-entidade.component';
import { RestricaoLabelComponent } from './components/restricao/restricao-label/restricao-label.component';
import { RestricaoNumberComponent } from './components/restricao/restricao-number/restricao-number.component';
import { RestricaoStringComponent } from './components/restricao/restricao-string/restricao-string.component';
import { ConfirmationService } from './services/confirmation-service.service';
import { MessageService } from './services/message-service.service';
import { ProgressService } from './services/progress-service.service';

@NgModule({
  imports: [
    // Ng
    BrowserModule,
    CommonModule,
    FormsModule,

    // Primeng
    AutoCompleteModule,
    ChipsModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    OverlayPanelModule,
    ProgressBarModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [
    // Maestro
    RestricaoEntidadeComponent,
    RestricaoLabelComponent,
    RestricaoNumberComponent,
    RestricaoStringComponent
  ],
  exports: [
    // Maestro
    RestricaoEntidadeComponent,
    RestricaoLabelComponent,
    RestricaoNumberComponent,
    RestricaoStringComponent,

    // Primeng
    AutoCompleteModule,
    ChipsModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    OverlayPanelModule,
    ProgressBarModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    DialogModule,
    ButtonModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    ProgressService,
    CsPrimeng,
    MsPrimeng
  ]
})
export class MaestroNgModule { }
