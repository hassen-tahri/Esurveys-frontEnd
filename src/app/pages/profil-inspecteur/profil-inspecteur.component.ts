import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Inspecteur } from '../inspecteur/inspecteur';
import { InspecteurService } from '../inspecteur/inspecteur.service';
import { PagesComponent } from '../pages.component';
import { User } from '../utilisateur/user';
import { UserService } from '../utilisateur/user.service';

@Component({
  selector: 'ngx-profil-inspecteur',
  templateUrl: './profil-inspecteur.component.html',
  styleUrls: ['./profil-inspecteur.component.scss']
})
export class ProfilInspecteurComponent implements OnInit {
  showPassword = false;
  inspecteur: Inspecteur
  user: User
  oldPseudo: string

  constructor(private inspecteurService: InspecteurService,
    private userService: UserService,
    private router: Router,
    private toastrService: NbToastrService) { }


    async ngOnInit() {
      let role = localStorage.getItem(PagesComponent.role)
      if (role == PagesComponent.admin) {
        this.router.navigate(['/pages/doNotAccess']);
      }
      else {
        let userId = localStorage.getItem(PagesComponent.userId)
        this.inspecteur = new Inspecteur()
        this.user = new User()
        this.user = await this.userService.getById(+userId)
        this.inspecteur = await this.inspecteurService.getByUserId(+userId)
        this.oldPseudo = this.user.pseudo
      }

    }
  
    delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async save() {
      if (this.user.pseudo != this.oldPseudo) {
        if (!!await this.userService.getByPseudo(this.user.pseudo)) {
          this.toastrService.danger("Le pseudo "+this.user.pseudo+" existe déjà", "Pseudo invalide il faut le changer")
        }
        else {
          this.userService.editUser(this.user)
          this.inspecteurService.editInspecteur(this.inspecteur, this.user.id)
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/profilInspecteur']));
          this.toastrService.success("Succès", "Détails sauvgardé");
          //actualiser la page 
          await this.delay(500)
          window.location.reload()
        }
      }
      else {
        this.inspecteurService.editInspecteur(this.inspecteur, this.user.id)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/profilInspecteur']));
        this.toastrService.success("Succès", "Détails sauvgardé");
        //actualiser la page 
        await this.delay(500)
        window.location.reload()
      }
    }
  
    //input password
    getInputType() {
      if (this.showPassword) {
        return 'text';
      }
      return 'password';
    }
  
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    }
  
}
