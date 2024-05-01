import { RestricaoTemporalComponent } from './components/restricao/restricao-temporal/restricao-temporal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
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
import { ToastModule } from 'primeng/toast';
// tslint:disable-next-line:max-line-length
import { RestricaoEntidadeComponent } from './components/restricao/restricao-entidade/restricao-entidade.component';
import { RestricaoLabelComponent } from './components/restricao/restricao-label/restricao-label.component';
import { RestricaoNumberComponent } from './components/restricao/restricao-number/restricao-number.component';
import { RestricaoStringComponent } from './components/restricao/restricao-string/restricao-string.component';
import { ConfirmacaoService } from './services/confirmacao-service.service';
import { MensagemService } from './services/mensagem-service.service';
import { ProgressoService } from './services/progresso-service.service';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  imports: [
    // Ng
    BrowserModule,
    CommonModule,
    FormsModule,

    // Primeng
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    OverlayPanelModule,
    ProgressBarModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [
    // Maestro
    RestricaoEntidadeComponent,
    RestricaoLabelComponent,
    RestricaoNumberComponent,
    RestricaoStringComponent,
    RestricaoTemporalComponent
  ],
  exports: [
    // Maestro
    RestricaoEntidadeComponent,
    RestricaoLabelComponent,
    RestricaoNumberComponent,
    RestricaoStringComponent,
    RestricaoTemporalComponent,

    // Primeng
    AutoCompleteModule,
    ChipsModule,
    CalendarModule,
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
    ConfirmacaoService,
    MensagemService,
    ProgressoService,
    ConfirmationService,
    MessageService
  ]
})
export class MaestroNgModule { }
