import { NgModule } from '@angular/core';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCalendarRangeModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbPopoverModule, NbProgressBarModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbToastrModule, NbToggleModule, NbTooltipModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './Miscellaneous/miscellaneous.module';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { WebcamModule } from 'ngx-webcam';
import { ButtonViewConstatInspecteur, InspecteurComponent } from './inspecteur/inspecteur.component';
import { ModalInspecteurComponent } from './inspecteur/modal-inspecteur/modal-inspecteur.component';
import { ShowInspecteurComponent } from './inspecteur/show-inspecteur/show-inspecteur.component';
import { FormsModule } from '@angular/forms';
import { ButtonViewConstatChargeur, ChargeurComponent } from './chargeur/chargeur.component';
import { ModalChargeurComponent } from './chargeur/modal-chargeur/modal-chargeur.component';
import { ShowChargeurComponent } from './chargeur/show-chargeur/show-chargeur.component';
import { ConstatComponent, ImageViewerInTable } from './constat/constat.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalDommageItemComponent } from './constat/modal-dommage-item/modal-dommage-item.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ButtonViewConstatVoyage, VoyageComponent } from './voyage/voyage.component';
import { ModalVoyageComponent } from './voyage/modal-voyage/modal-voyage.component';
import { ShowVoyageComponent } from './voyage/show-voyage/show-voyage.component';
import { TemplatePdfComponent } from './template-pdf/template-pdf.component';
import { ListConstatComponent } from './list-constat/list-constat.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ConstatChargeurComponent } from './chargeur/constat-chargeur/constat-chargeur.component';
import { ConstatVoyageComponent } from './voyage/constat-voyage/constat-voyage.component';
import { ConstatInspecteurComponent } from './inspecteur/constat-inspecteur/constat-inspecteur.component';
import { AppCameraComponent } from './template-pdf/app-camera/app-camera.component';
import { LoginComponent } from './login/login.component';
import { BateauComponent } from './bateau/bateau.component';
import { ShowBateauComponent } from './bateau/show-bateau/show-bateau.component';
import { ModalBateauComponent } from './bateau/modal-bateau/modal-bateau.component';
import { PortComponent } from './port/port.component';
import { ModalPortComponent } from './port/modal-port/modal-port.component';
import { ShowPortComponent } from './port/show-port/show-port.component';
import { TypeComponent } from './type/type.component';
import { DommageComponent } from './dommage/dommage.component';
import { UniteComponent } from './unite/unite.component';
import { ModalDommageComponent } from './dommage/modal-dommage/modal-dommage.component';
import { ShowDommageComponent } from './dommage/show-dommage/show-dommage.component';
import { ModalTypeComponent } from './type/modal-type/modal-type.component';
import { ShowModalComponent } from './type/show-modal/show-modal.component';
import { ModalUniteComponent } from './unite/modal-unite/modal-unite.component';
import { ShowUniteComponent } from './unite/show-unite/show-unite.component';
import { PdfPageCreatorComponent } from './pdf-page-creator/pdf-page-creator.component';
import { ModalImageComponent } from './constat/modal-image/modal-image.component';
import { ConstatForchargeurComponent } from './constat-forchargeur/constat-forchargeur.component';
import { ProfilChargeurComponent } from './profil-chargeur/profil-chargeur.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PagePdfViewrComponent } from './page-pdf-viewr/page-pdf-viewr.component';
import { Page404Component } from './page404/page404.component';
import { ProfilInspecteurComponent } from './profil-inspecteur/profil-inspecteur.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CustomDashboardComponent } from './custom-dashboard/custom-dashboard.component';
import { ShowDommageItemComponent } from './constat/show-dommage-item/show-dommage-item.component';
import { ModalScanComponent } from './constat/modal-scan/modal-scan.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxEchartsModule } from 'ngx-echarts';




@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    Ng2SmartTableModule,
    WebcamModule, 
    NbToastrModule,
    NbButtonModule,
    FormsModule,
    NbLayoutModule,
    NbInputModule,
    NgSelectModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbAccordionModule,
    ImageCropperModule,
    NbTooltipModule,
    NbToggleModule,
    NbIconModule, 
    NbAlertModule,
    NbPopoverModule,
    NbEvaIconsModule,
    NbStepperModule,
    NbCalendarRangeModule,
    NbButtonGroupModule,
    NbTabsetModule,
    NbFormFieldModule,
    PdfViewerModule,
    NbSelectModule,
    NbAutocompleteModule,
    ClipboardModule,
    NbProgressBarModule,
    NbListModule,
    NgxEchartsModule,


    
    
    
    
  ],
  declarations: [
    PagesComponent,
    UtilisateurComponent,
    InspecteurComponent,
    ModalInspecteurComponent,
    ShowInspecteurComponent,
    ChargeurComponent,
    ModalChargeurComponent,
    ShowChargeurComponent,
    ConstatComponent,
    ModalDommageItemComponent,
    VoyageComponent,
    ModalVoyageComponent,
    ShowVoyageComponent,
    TemplatePdfComponent,
    ButtonViewConstatVoyage,
    ListConstatComponent,
    ButtonViewConstatChargeur,
    ButtonViewConstatInspecteur,
    ConstatChargeurComponent,
    ConstatVoyageComponent,
    ConstatInspecteurComponent,
    AppCameraComponent,
    LoginComponent,
    BateauComponent,
    ShowBateauComponent,
    ModalBateauComponent,
    PortComponent,
    ModalPortComponent,
    ShowPortComponent,
    TypeComponent,
    DommageComponent,
    UniteComponent,
    ModalDommageComponent,
    ShowDommageComponent,
    ModalTypeComponent,
    ShowModalComponent,
    ModalUniteComponent,
    ShowUniteComponent,
    PdfPageCreatorComponent,
    ModalImageComponent,
    ConstatForchargeurComponent,
    ProfilChargeurComponent,
    PagePdfViewrComponent,
    Page404Component,
    ProfilInspecteurComponent,
    DocumentationComponent,
    CustomDashboardComponent,
    ShowDommageItemComponent,
    ModalScanComponent,
    ImageViewerInTable,
  ],
})
export class PagesModule {
}
