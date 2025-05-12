import { RestricaoTemporalComponent } from './components/restricao/restricao-temporal/restricao-temporal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PopoverModule } from 'primeng/popover';
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
    DatePickerModule,
    ChipModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    PopoverModule,
    ProgressBarModule,
    CheckboxModule,
    SelectModule,
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
    ChipModule,
    DatePickerModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    PopoverModule,
    ProgressBarModule,
    CheckboxModule,
    SelectModule,
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
