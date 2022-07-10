import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { Bateau } from '../bateau/bateau';
import { ChargeurService } from '../chargeur/chargeur.service';
import { Inspecteur } from '../inspecteur/inspecteur';
import { InspecteurService } from '../inspecteur/inspecteur.service';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { PagesComponent } from '../pages.component';
import { PdfTemplateService } from '../pdf-page-creator/pdf-template.service';
import { Port } from '../port/port';
import { TypeService } from '../type/type.service';
import { Unite } from '../unite/unite';
import { UniteService } from '../unite/unite.service';
import { User } from '../utilisateur/user';
import { UserService } from '../utilisateur/user.service';
import { Voyage } from '../voyage/voyage';
import { VoyageService } from '../voyage/voyage.service';
import { DommageItemService } from './modal-dommage-item/dommage-item.service';
import { ModalDommageItemComponent } from './modal-dommage-item/modal-dommage-item.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { ShowDommageItemComponent } from './show-dommage-item/show-dommage-item.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PagePdfViewrComponent } from '../page-pdf-viewr/page-pdf-viewr.component';
import { ModalScanComponent } from './modal-scan/modal-scan.component';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { GoogleCloudVisionService } from '../template-pdf/google-cloud-vision.service';
import { Mail } from '../mailing/mail';
import { Chargeur } from '../chargeur/chargeur';
import { MailService } from '../mailing/mail.service';
import { HttpClient } from '@angular/common/http';
import { ClipboardService } from 'ngx-clipboard';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-ImageViewerInTable',
  template:
    '<div>' +
    '<div style="border-style: outset; width: 118px; height : 115px;  position: relative; display:flex; align-items:center; justify-content:center;">' +
    '<img  width="210px" style="align-content: center; max-width: 100%; max-height: 100%; " height="auto" [src]="retrievedImage">' +
    '</div>' +
    '</div>'

})
export class ImageViewerInTable implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  res: any;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: string;

  constructor() {
  }
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
    this.retrieveResonse = this.rowData;
    this.base64Data = this.retrieveResonse.picByte;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }
}

@Component({
  selector: 'ngx-constat',
  templateUrl: './constat.component.html',
  styleUrls: ['./constat.component.scss']
})
export class ConstatComponent implements OnInit {

  A: string
  listeVoyageNonArchive = []
  listeUnite = []
  listeType = []
  listeChargeur = []
  listDommageItemChargement: any
  listDommageItemDeChargement: any
  selectedVoyage: any
  selectedUnite: any
  selectedNewUniteObject: any
  selectedChargeur: any
  selectedType: any
  constat: Constat
  inspecteurCh: Inspecteur
  inspecteurDCh: Inspecteur
  voyage: Voyage
  bateau: Bateau
  portChargement: Port
  portDechargement: Port
  isNewType: boolean
  disabledTypeInput
  isSaved = false
  user: User
  flipped: boolean;
  phase: string
  pdftoShow: any
  test: string
  dechargementOnly: boolean
  isScanned: boolean
  mail: Mail
  scanButtonName: string;
  scanButtonStatus : string;




  //scan
  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();



  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  resultScan: string

  // latest snapshot
  public webcamImage: WebcamImage = null;
  public base64Image: string;
  public visionresponse: string;
  public objvisionresponse: string;
  selectedUnitetest: number;

  //img smart table
  imgList ;






  constructor(private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private chargeurService: ChargeurService,
    private voyageService: VoyageService,
    private typeService: TypeService,
    private inspecteurService: InspecteurService,
    private constatService: ConstatService,
    private uniteService: UniteService,
    private userService: UserService,
    private dommageItemService: DommageItemService,
    private pdfTemplate: PdfTemplateService,
    private vision: GoogleCloudVisionService,
    private mailService: MailService,
    protected httpclient: HttpClient,
    private _clipboardService: ClipboardService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  async ngOnInit() {


    //scan 
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    this.isScanned = false
    this.scanButtonName="scan"
    this.scanButtonStatus="primary"
    this.disabledTypeInput = false
    this.constat = new Constat()
    this.inspecteurCh = new Inspecteur()
    this.inspecteurDCh = new Inspecteur()
    this.voyage = new Voyage()
    this.bateau = new Bateau()
    this.portChargement = new Port()
    this.portDechargement = new Port()
    let e = localStorage.getItem("EstorageConstat")
    this.listeChargeur = await this.chargeurService.getAll()
    this.listeType = await this.typeService.getAll()
    this.listeUnite = await this.uniteService.getAll()
    this.listeVoyageNonArchive = await this.voyageService.getByArchive(false)
    localStorage.removeItem("phase")

    //format liste voyage
    for (let i = 0; i < this.listeVoyageNonArchive.length; i++) {
      var raw = new Date(this.listeVoyageNonArchive[i].dateChargement);
      var formatted = new DatePipe('fr').transform(raw, 'dd MMM yyyy');
      this.listeVoyageNonArchive[i].code = this.listeVoyageNonArchive[i].bateau.intitule + "  /" + formatted;
    }

    if (e === '0') {
      this.A = 'Suivant';
      this.constat.inspecteurChargement = this.inspecteurCh
      this.constat.inspecteurDechargement = null
      let idVoyage = localStorage.getItem("idVoyage")
      localStorage.removeItem("idVoyage")
      //phase constat
      this.phase = "chargement"
      localStorage.setItem("phase", "chargement")
      this.calculateInspecteur()
      //ajout constat depuis la page constat/voyage 
      if (idVoyage != null) {
        this.selectedVoyage = +idVoyage
        this.calculateAttrVoyage(event)
      }
      this.dechargementOnly = false
    }
    if (e === '1') {
      this.flipped = true
      this.A = 'Commencer';
      let id = localStorage.getItem('id')
      this.constat = await this.constatService.getById(+id)
      //console.log(this.constat)
      localStorage.setItem("ccId", this.constat.id.toString())
      this.constat.dateChargement = new Date(this.constat.dateChargement)
      this.constat.dateDechargement = new Date(this.constat.dateDechargement)
      this.selectedChargeur = this.constat.chargeur.id
      this.selectedVoyage = this.constat.voyage.id
      this.selectedUnite = this.constat.unite.id
      this.selectedType = this.constat.unite.type.id
      this.isSaved = true
      this.calculateAttrBateauPort(event)
      if (this.constat.phase === "chargement") {
        this.inspecteurCh = this.constat.inspecteurChargement
        this.inspecteurCh.nom = this.constat.inspecteurChargement.nom + " " + this.constat.inspecteurChargement.prenom
        this.inspecteurDCh = await this.inspecteurService.getByUserId(+localStorage.getItem(PagesComponent.userId))
        this.inspecteurDCh.nom = this.inspecteurDCh.nom + " " + this.inspecteurDCh.prenom
        this.dechargementOnly = true
        this.phase = "dechargement"
        localStorage.setItem("phase", "dechargement")
      }
      if (this.constat.phase === "dechargement") {
        this.inspecteurDCh = this.constat.inspecteurDechargement
        this.inspecteurCh = new Inspecteur()
        this.inspecteurCh.id = -1
        this.dechargementOnly = true
        this.phase = "dechargement"
        localStorage.setItem("phase", "dechargement")
      }
      this.reloadTable(event)
    }
  }


  filpCalculatePhase() {
    this.flipped = !this.flipped;
    if (!this.flipped) {
      localStorage.removeItem("phase")
      localStorage.setItem("phase", "chargement")
      this.phase = "chargement"
    }
    if (this.flipped) {
      localStorage.removeItem("phase")
      localStorage.setItem("phase", "dechargement")
      this.phase = "dechargement"
    }
    let e = localStorage.getItem('EstorageConstat');
    if (e === '0') {
      this.calculateInspecteur()
    }
  }

  async onSave() {
    let e = localStorage.getItem('EstorageConstat');
    if (e === '0') {
      this.A = "Enregistrer"
      this.isSaved = true
      this.constat.etat = "new"
      this.constat.phase = this.phase
      this.constat.dateCreation = new Date(Date.now()) 
      this.calculateInspecteur()
      let uniteToInsert
      if (this.isNewType) {
        uniteToInsert = this.selectedNewUniteObject.id
        this.isNewType = false
      }
      else {
        uniteToInsert = this.selectedUnite
      }
      if(new Date(this.constat.dateChargement).getDate() != new Date(this.voyage.dateChargement).getDate())
      {this.decalageDate(this.constat.dateChargement)}
      if(new Date(this.constat.dateDechargement).getDate() != new Date(this.voyage.dateDechargement).getDate())
      {this.decalageDate(this.constat.dateDechargement)}
      this.constat = await this.constatService.addConstat(this.constat, this.selectedVoyage, this.selectedChargeur, uniteToInsert, this.inspecteurCh.id, this.inspecteurDCh.id)
      //mailing
     // this.forwordConstat()



      localStorage.setItem("ccId", this.constat.id.toString())
      this.toastrService.success("Succès", "Constat Ajoutée")
    } if (e === '1') {
      this.A = "Enregistrer"
     // console.log(this.constat)
      this.constat.phase = this.phase
      localStorage.setItem("ccId", this.constat.id.toString())
      if(new Date(this.constat.dateChargement).getDate() != new Date(this.voyage.dateChargement).getDate())
      {this.decalageDate(this.constat.dateChargement)}
      if(new Date(this.constat.dateDechargement).getDate() != new Date(this.voyage.dateDechargement).getDate())
      {this.decalageDate(this.constat.dateDechargement)}
      await this.constatService.editConstat(this.constat, this.selectedVoyage, this.selectedChargeur, this.selectedUnite, this.inspecteurCh.id, this.inspecteurDCh.id)
      this.toastrService.success("Succès", "Dechargement enregistré");
    }
  }



  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce dommage`)) {
      event.confirm.resolve(await this.dommageItemService.delete(event.data.id),
        this.listDommageItemChargement.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Dommage supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

  async openWindowDommage(event) {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    localStorage.setItem("ccId", this.constat.id.toString())
    localStorage.setItem("phase",this.phase)
    this.windowService.open(ModalDommageItemComponent, { title: 'Ajouter' });
  }

  async reloadTable(event) {
    this.listDommageItemChargement = await this.dommageItemService.getByConstatIdAndPhase(this.constat.id, "chargement")
    this.listDommageItemChargement.filter(p => p !== event.data)
    this.listDommageItemDeChargement = await this.dommageItemService.getByConstatIdAndPhase(this.constat.id, "dechargement")
    this.listDommageItemDeChargement.filter(p => p !== event.data)


    this.imgList = await this.constatService.getimages(this.constat.id);


  }

  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('e', '1');
      localStorage.setItem("ccId", this.constat.id.toString())
      this.windowService.open(ModalDommageItemComponent, { title: 'Modifier dommage' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(ShowDommageItemComponent, { title: 'Afficher dommage' });
    }
  }


  async calculateAttrVoyage(ev: any) {
    this.voyage = await this.voyageService.getById(this.selectedVoyage)
    this.bateau = this.voyage.bateau
    this.portChargement = this.voyage.portChargement
    this.portDechargement = this.voyage.portDechargement
    this.constat.dateChargement = new Date(this.voyage.dateChargement)
    this.constat.dateDechargement = new Date(this.voyage.dateDechargement)
  }

  async calculateAttrBateauPort(ev: any) {
    this.voyage = await this.voyageService.getById(this.selectedVoyage)
    this.bateau = this.voyage.bateau
    this.portChargement = this.voyage.portChargement
    this.portDechargement = this.voyage.portDechargement
  }

  async calculateInspecteur() {
    if (this.phase === "chargement") {
     // console.log("louel")
      this.inspecteurDCh = new Inspecteur()
      this.inspecteurDCh.id = -1
      this.inspecteurCh = await this.inspecteurService.getByUserId(+localStorage.getItem(PagesComponent.userId))
      this.inspecteurCh.nom = this.inspecteurCh.nom + " " + this.inspecteurCh.prenom
    }
    if (this.phase === "dechargement") {
     // console.log("etehni")
      this.inspecteurCh = new Inspecteur()
      this.inspecteurCh.id = -1
      this.inspecteurDCh = await this.inspecteurService.getByUserId(+localStorage.getItem(PagesComponent.userId))
      this.inspecteurDCh.nom = this.inspecteurDCh.nom + " " + this.inspecteurDCh.prenom
    }
  }

  async changeType(en: any) {
    if (!this.isNewType && this.selectedUnite != null) {
      this.selectedType = (await (this.uniteService.getById(this.selectedUnite))).type.id
      this.disabledTypeInput = true
    }
  }

  openWindowImage() {
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e', '0');
    localStorage.setItem("ccId", this.constat.id.toString())
    if (this.isScanned) { this.toggleScan() }
    this.windowService.open(ModalImageComponent, { title: 'Ajouter' });
  }

  addNewUnite = async (term) => {
    this.selectedNewUniteObject = new Unite()
    this.selectedNewUniteObject.matricule = term
    if (!!this.selectedType) {
      this.disabledTypeInput = false
      this.selectedNewUniteObject = await this.uniteService.add(this.selectedNewUniteObject, this.selectedType)
      //msg
      this.toastrService.success((await this.typeService.getById(this.selectedType)).intitule +" "+this.selectedNewUniteObject.matricule ,"Unité ajoutée avec succé")
    }
    this.isNewType = true
    return ({ matricule: term, type: this.selectedType, });
  };

  async viewPdf() {
    localStorage.removeItem('id');
    localStorage.setItem('id', this.constat.id.toString());
    this.windowService.open(PagePdfViewrComponent, { title: 'Constat' });
  }

  async downloadPdf() {
    const documentDefinition = await this.pdfTemplate.getDocumentDefinition(this.constat);
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition).open();
  }




  //scan
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }


  public cameraWasSwitched(deviceId: string): void {
   // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }



  toggleScan() {
    this.isScanned = !this.isScanned
    if (this.isScanned) {
      this.scanButtonStatus = "danger"
      this.scanButtonName = "fermer"
    }
    else {
      this.scanButtonStatus = "primary"
      this.scanButtonName = "scan"
    }
  }




  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.base64Image = this.webcamImage.imageAsBase64
    this.vision.getText(this.base64Image).subscribe((result) => {
      this.base64Image = "data:image/jpg;base64," + this.base64Image;
      //console.log(result['responses'][0])
      const texts = result['responses'][0]['fullTextAnnotation']['text']
      //const texts = result['responses'][0]['textAnnotations'];

      // check if text exist
      if (texts === undefined || texts === null) {
        // prompt no data
        this.visionresponse = texts;
        this.resultScan = "rien"
      } else {
        this.resultScan = texts
      }

    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
      this.resultScan = "ERROR"
    });
  }


  compareFn(item, selected) {
    return item.value === selected.value;
  }

  forwordConstat() {
    var win = window.open('', '_blank');
    this.mail = new Mail()
    this.mail.subject = "Nouveau Constat : " + this.constat.voyage.portChargement.intitule + "_" + this.constat.dateChargement
    this.mail.message = "Merci de consulter votre espace afin de visualiser le nouveau constat " + this.constat.chargeur.intitule + "_" + this.constat.voyage.portChargement + "_" + this.constat.dateChargement
    this.mail.email = this.constat.chargeur.email
    this.httpclient.post(PagesComponent.urlConfig + "email", this.mail).subscribe(async function (response) {
      const documentDefinition = await this.pdfTemplate.getDocumentDefinition(this.constat);
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition).open();
    pdfMake.createPdf(pdfDocGenerator).print({}, win);
     this.mail.pathToAttachment = response
    });
  }


  //smart table dommage
  settings = {
    noDataMessage: "vide",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 8,
    },
    actions: {
      position: 'right',
      width: "115px",
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
      ],
    },
    columns: {
      dommage: {
        title: 'Description',
        type: 'text',
        valuePrepareFunction: (value) => { return value.intitule },
        filterFunction(obj?: any, search?: string): boolean {
          if (obj.intitule.toLowerCase().indexOf(search) > -1 || obj.intitule.toUpperCase().indexOf(search) > -1)
            return true;
          return false;
        },
      },
    },
  }

//smart table image
  settings2 = {
    noDataMessage: "vide",
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 8,
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: true,
      custom: [
      ],
    },
    columns: {
      img: {
        title : 'Image',
        type: 'custom',
        renderComponent: ImageViewerInTable,
        filter: false,
        show: false,
        addable: false,
        editable: false,
      }
    },
  }

 async onDeleteConfirmImage(event) {
    if (window.confirm(`Vous etes sure de supprimer cette image`)) {
      event.confirm.resolve(await this.constatService.deleteImage(event.data.name),
        this.imgList.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Image supprimée")
      );
    } else {
      event.confirm.reject();
    }
  }

  decalageDate(date: Date) {
    if (!!date) { date.setDate(date.getDate() + 1) }
  }
  

}
