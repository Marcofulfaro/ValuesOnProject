import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { CedoliniService } from 'src/app/demo/service/cedolini.service';
import { DipendentiService } from 'src/app/demo/service/dipendenti.service';
import { LoginService } from 'src/app/demo/service/login.service';
import { Cedolino } from 'src/app/dto/cedolino.dto';

@Component({
  selector: 'app-dipendenti-docs',
  standalone: true,
  imports: [TableModule,
            FormsModule,
            ReactiveFormsModule,
            InputGroupModule,
            InputTextModule,
            ButtonModule,
            RouterLink,
            ToastModule,
            FileUploadModule,
            CommonModule
  ],
  providers: [MessageService],
  templateUrl: './dipendenti-docs.component.html',
  styleUrl: './dipendenti-docs.component.scss'
})
export class DipendentiDocsComponent implements OnInit {
  documenti: Cedolino[] = [];
  documentiFull: any[];
  searchTerm: string = '';
  subscription!: Subscription;
  date1: Date | undefined;
  idUser: any;
  decodedData : any;
  showFile = false;
  selectedFile : File | null = null;



  constructor(
      private messageService: MessageService, 
      private loginService: LoginService,
      private dipendentiService: DipendentiService,
      private cedoliniService: CedoliniService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.idUser = params.get('idUser');
        console.log(this.idUser)
      });
      this.cedoliniService.getCedoliniForSpecificUser(this.idUser).subscribe(
          doc => {this.documenti = doc, this.documentiFull = [...doc],  console.log(doc)
          },
          error => console.log(error)
        
      )
      const contentType = 'application/pdf';
      const blob = new Blob([this.decodedData], { type: contentType });
  }

  onFileSelected(event: any, doc: Cedolino) {
    this.selectedFile = event.target.files[0];
    this.showFile = true;

    const searchIndex = (element) => element == doc;
    const index = this.documenti.findIndex(searchIndex);
  
    if (this.selectedFile && this.documenti[index]) {
      const file = event.target.files[0];
      console.log(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.documenti[index].pdfBase64 = reader.result?.toString() || '';

        this.documenti[index].pdfBase64 = this.documenti[index].pdfBase64?.replace(
          'data:application/pdf;base64,','');
        this.messageService.add({severity: 'info', detail: `Nuovo file caricato per il record con id: ${doc.id}. Per salvare le modifiche e cancellare il vecchio file, premi il pulsante 'Aggiorna'` })
      };
    }
  }

  
  /*
  showPdfPreview(base64String: string) {
    console.log(base64String)
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${base64String}`);
    const previewWindow = window.open(); // This opens a new browser window for preview
    if (previewWindow) {
      previewWindow.document.write(`<iframe src="${safeUrl}" width="100%" height="600px"></iframe>`);
    }
  }
    */

  showPdfPreview(base64String: string) {
    console.log(base64String);
    
    const safeUrl = `data:application/pdf;base64,${base64String}`;
  
    const previewWindow = window.open(); // Open a new browser window
    if (previewWindow) {
      const iframe = previewWindow.document.createElement('iframe'); // Create iframe in the new window
      iframe.src = safeUrl;
      iframe.width = '100%';
      iframe.height = '100%';
      previewWindow.document.body.appendChild(iframe); // Append iframe to the new window's body
    }
  }

  

  searchDoc() {
      if (this.searchTerm) {
        this.documenti = this.documentiFull.filter(
          (doc =>
            doc.date.includes(this.searchTerm.toLowerCase())
        ));
      } else {
        this.cedoliniService.getCedoliniForSpecificUser(this.idUser).subscribe(
          doc => {
            this.documenti = doc;
          },
          error => console.log(error)
        );
      }
    }

    updateRecord(doc: Cedolino): void {
      console.log('DOC', doc)
      this.cedoliniService.updateRecord(doc).subscribe(
        (updatedRecord) => {
          console.log('Data updated successfully', updatedRecord);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Aggiornamento avvenuto con successo' });
        },
        (error) => {
          console.error('Error updating record', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Errore nell\'aggionamento' });
        }
      );
    }
  
    deleteRecord(doc: Cedolino): void{
      console.log(doc)
      this.cedoliniService.deleteRecord(doc.id).subscribe(
        (deletedRecord) => {
          console.log(`Record with id: ${doc.id} was deleted from database.`)
          const cedolinoIndex = this.documenti.findIndex(d => d.id === doc.id);
          if (cedolinoIndex !== -1) {
            this.documenti.splice(cedolinoIndex, 1);
            this.messageService.add({ severity: 'success', detail: `Cedolino: ${doc.id} è stato cancellato con successo.` });
          }
        },
        (error) => {
          console.error('Error while deleting record ', error)
          this.messageService.add({severity: 'error', detail: `Errore cancellazione cedolino con id: ${doc.id}.`})
        }
      )
    }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe;
  }
}

