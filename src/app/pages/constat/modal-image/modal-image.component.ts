import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ConstatService } from '../../list-constat/constat.service';
import { PagesComponent } from '../../pages.component';

@Component({
  selector: 'ngx-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  retrievedImageName: any;
  base64Data: any;
  retrieveResonse: any;
  res: any;
  url = PagesComponent.urlConfig

  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  // toggle webcam on/off
  public showWebcam = false;
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

  constructor(private constatService: ConstatService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
    this.retrievedImage =  "none.jpg";
  }

  
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

async handleImage(webcamImage: WebcamImage) {
    let idC = localStorage.getItem("ccId")
    this.webcamImage = webcamImage;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.webcamImage.imageAsBase64;
    const file = this.dataURItoBlob(this.retrievedImage)
    const formData = new FormData();
    formData.append('imageFile', file,  this.calculateImageName()) 
    let phase = localStorage.getItem("phase")
    this.constatService.uploadimage(+idC, formData , phase);
    localStorage.removeItem("phase")
     localStorage.removeItem("ccId")
    this.windowRef.close();
    this.toastrService.success("Succès", "Image enregistrée");
  }

  calculateImageName() {
    return ("img" + this.getRandomInt(10) + String.fromCharCode(this.getRandomArbitrary(65,90)) + this.getRandomInt(100) + String.fromCharCode(this.getRandomArbitrary(64,90)) + this.getRandomInt(1000) + String.fromCharCode(this.getRandomArbitrary(65,90)) + String.fromCharCode(this.getRandomArbitrary(65,90)) + String.fromCharCode(this.getRandomArbitrary(65,90)) + this.getRandomInt(50) + ".jpeg")
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  

   dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }


  public cameraWasSwitched(deviceId: string): void {
    //console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.retrievedImage = reader.result;
      this.retrievedImageName = event.target.files[0].name;
    }
  }

  onSave()
  { let idC = localStorage.getItem("ccId")
    this.onUpload(+idC)
    localStorage.removeItem("ccId")
    this.windowRef.close();
    this.toastrService.success("Succès", "image enregistrée");}


  async onUpload(id: number) {
    //console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    let phase = localStorage.getItem("phase")
    this.constatService.uploadimage(id, uploadImageData , phase);
    localStorage.removeItem("phase")

  }

  async getImage(id: number) {
    this.res = await this.constatService.getimage(id);
    this.retrieveResonse = this.res;
    this.retrievedImageName = this.res.name;
    this.base64Data = this.retrieveResonse.picByte;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Prendre une photo') {
      this.showWebcam = true
    }
    if (selectedTab.tabTitle === 'Parcourir une image') {
      this.showWebcam = false
    }
  }
}
