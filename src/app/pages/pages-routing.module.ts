import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './Miscellaneous/not-found/not-found.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { InspecteurComponent } from './inspecteur/inspecteur.component';
import { ChargeurComponent } from './chargeur/chargeur.component';
import { ConstatComponent } from './constat/constat.component';
import { VoyageComponent } from './voyage/voyage.component';
import { TemplatePdfComponent } from './template-pdf/template-pdf.component';
import { ListConstatComponent } from './list-constat/list-constat.component';
import { ConstatVoyageComponent } from './voyage/constat-voyage/constat-voyage.component';
import { ConstatChargeurComponent } from './chargeur/constat-chargeur/constat-chargeur.component';
import { ConstatInspecteurComponent } from './inspecteur/constat-inspecteur/constat-inspecteur.component';
import { BateauComponent } from './bateau/bateau.component';
import { TypeRemorque } from './type/type-remorque';
import { UniteComponent } from './unite/unite.component';
import { DommageComponent } from './dommage/dommage.component';
import { PortComponent } from './port/port.component';
import { TypeComponent } from './type/type.component';
import { PdfPageCreatorComponent } from './pdf-page-creator/pdf-page-creator.component';
import { ConstatForchargeurComponent } from './constat-forchargeur/constat-forchargeur.component';
import { ProfilChargeurComponent } from './profil-chargeur/profil-chargeur.component';
import { Page404Component } from './page404/page404.component';
import { AdminGuard } from './login/admin.guard';
import { ProfilInspecteurComponent } from './profil-inspecteur/profil-inspecteur.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CustomDashboardComponent } from './custom-dashboard/custom-dashboard.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: CustomDashboardComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'utilisateur',
      component: UtilisateurComponent,
      canActivate : [AdminGuard]
    },
    {
      path: 'inspecteur',
      component: InspecteurComponent,
      canActivate : [AdminGuard]
    },
    {
      path: 'chargeur',
      component: ChargeurComponent,
    },
    {
      path: 'constatPage',
      component: ConstatComponent,
    },
    {
      path: 'voyage',
      component: VoyageComponent,
    },
    {
      path: 'test',
      component: TemplatePdfComponent,
    },
    {
      path: 'constat',
      component: ListConstatComponent,
    },
    {
      path: 'bateau',
      component: BateauComponent,
    },
    {
      path: 'type',
      component: TypeComponent,
    },
    {
      path: 'unite',
      component: UniteComponent,
    },
    {
      path: 'dommage',
      component: DommageComponent,
    },
    {
      path: 'port',
      component: PortComponent,
    },
    {
      path: 'constat/voyage',
      component: ConstatVoyageComponent,
    },
    {
      path: 'constat/chargeur',
      component: ConstatChargeurComponent,
    },
    {
      path: 'constat/inspecteur',
      component: ConstatInspecteurComponent,
    },
    {
      path: 'pdf',
      component: PdfPageCreatorComponent,
    },
    {
      path: 'constatChargeur',
      component: ConstatForchargeurComponent,
    },
    {
      path: 'profilChargeur',
      component: ProfilChargeurComponent,
    },
    {
      path: 'doNotAccess',
      component: Page404Component,
    },
    {
      path: 'profilInspecteur',
      component: ProfilInspecteurComponent,
    },
    {
      path: 'documentation',
      component: DocumentationComponent,
    },
    
    
    
   /*  {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    }, */
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
