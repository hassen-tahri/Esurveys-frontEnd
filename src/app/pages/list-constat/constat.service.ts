import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { Constat } from './constat';

@Injectable({
  providedIn: 'root'
})
export class ConstatService {
  url = PagesComponent.urlConfig + 'constat'

  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    return this.httpclient.get<Constat>(this.url + '/' + id).toPromise();
  }

  async getAll() {
    return this.httpclient.get<Constat[]>(this.url).toPromise();
  }

  async getByVoyage(id: Number) {
    return this.httpclient.get<Constat[]>(this.url + '/voyage/' + id).toPromise();
  }

  async getByChargeur(id: Number) {
    return this.httpclient.get<Constat[]>(this.url + '/chargeur/' + id).toPromise();
  }

  async getByInspecteurCh(id: Number) {
    return this.httpclient.get<Constat[]>(this.url + '/inspecteurChargement/' + id).toPromise();
  }

  async getByInspecteurDch(id: Number) {
    return this.httpclient.get<Constat[]>(this.url + '/inspecteurDechargement/' + id).toPromise();
  }

  async getByEtat(etat : string) {
    return this.httpclient.get<Constat[]>(this.url + '/etat/' + etat).toPromise();
  }

  async addConstat(constat: Constat, idV: Number, idCh: Number, idU: Number, idInsCh: Number, idInsDch: Number) {
    return this.httpclient.post<Constat>(this.url + '/voyage/' + idV + '/chargeur/' + idCh + '/unite/' + idU + '/inspecteurCh/' + idInsCh + '/inspecteurDch/' + idInsDch, constat).toPromise();
  }

  async editConstat(constat: Constat, idV: Number, idCh: Number, idU: Number, idInsCh: Number, idInsDch: Number) {
    return this.httpclient.put(this.url + "/" + constat.id + '/voyage/' + idV + '/chargeur/' + idCh + '/unite/' + idU + '/inspecteurCh/' + idInsCh + '/inspecteurDch/' + idInsDch, constat).toPromise();
  }

  async getByDateChargementInRange(dateDeb : string , dateFin : string) {
    return this.httpclient.get<Constat[]>(this.url+"/RangeChargement/"+dateDeb+"/"+dateFin).toPromise();
  }

  async getByDateDechargementInRange(dateDeb : string , dateFin : string) {
    return this.httpclient.get<Constat[]>(this.url+"/RangeDechargement/"+dateDeb+"/"+dateFin).toPromise();
  }

  async getByInspecteurChargementAndDateChargementInRange(id : number ,dateDeb : string , dateFin : string){
    return this.httpclient.get<Constat[]>(this.url+"/InspecteurChargement/RangeChargement/"+id+"/"+dateDeb+"/"+dateFin).toPromise();
  }

  async getByInspecteurDechargementAndDateChargementInRange(id : number ,dateDeb : string , dateFin : string){
    return this.httpclient.get<Constat[]>(this.url+"/InspecteurDechargement/RangeChargement/"+id+"/"+dateDeb+"/"+dateFin).toPromise();
  }

  async getByChargeurAndEtat(id: Number , etat : string) {
    return this.httpclient.get<Constat[]>(this.url + '/chargeur/' + id +"/etat/"+ etat).toPromise();
  }

  async deleteConstatById(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }

  uploadimage(id: number, uploadImageData: FormData, phase : string) {
    return this.httpclient.post(this.url + '/' + id +'/phase/' + phase + '/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
         // console.log('Image uploaded successfully');
        } else {
         // console.log('Image not uploaded successfully');
        }
      }
      );
  }

  async getimage(id: number) {
    return this.httpclient.get(this.url + '/' + id + '/image/get').toPromise();
  }


  async deleteImage(name : string) {
    return this.httpclient.delete(this.url + '/image/' + name).toPromise();
  }

  async getimages(id: number) {
    return this.httpclient.get(this.url + '/' + id + '/image/getAll').toPromise();
  }

  async countByChargeurAndPhase(id : number , phase : string)
  { return this.httpclient.get(this.url + '/countByChargeurAndPhase/' + id + '/phase/'+phase).toPromise();}

  async countAll()
  {return this.httpclient.get(this.url + '/countAll/').toPromise();}

  async countByPhase(phase :string)
  {return this.httpclient.get(this.url + '/countByPhase/'+phase).toPromise();}

  async getimagesByConstatAndPhase(id: number , phase:string) {
    return this.httpclient.get(this.url + '/' + id + '/phase/'+ phase + '/image/getAllConstatPhase').toPromise();
  }

  async getimageByConstatAndPhase(id: number, phase:string) {
    return this.httpclient.get(this.url + '/' + id + '/phase/'+ phase + '/image/getConstatPhase').toPromise();
  }
  
}
