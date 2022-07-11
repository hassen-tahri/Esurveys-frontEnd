import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbCalendarRange, NbDateService, NbToastrService, NbWindowService } from '@nebular/theme';
import { InspecteurService } from '../inspecteur/inspecteur.service';
import { PagePdfViewrComponent } from '../page-pdf-viewr/page-pdf-viewr.component';
import { PagesComponent } from '../pages.component';
import { PdfPageCreatorComponent } from '../pdf-page-creator/pdf-page-creator.component';
import { ConstatService } from './constat.service';




@Component({
  selector: 'ngx-list-constat',
  templateUrl: './list-constat.component.html',
  styleUrls: ['./list-constat.component.scss']
})
export class ListConstatComponent implements OnInit {


  source = []
  range: NbCalendarRange<Date>;
  pipe = new DatePipe('en-US');
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
  checked: any
  SelectGroupValue = [];
  role: string
  idInspecteur


  constructor(private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private constatService: ConstatService,
    private router: Router,
    protected dateService: NbDateService<Date>,
    private cdGButon: ChangeDetectorRef,
    private inspecteurService : InspecteurService
  ) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }



  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  async ngOnInit() {
    this.role = localStorage.getItem(PagesComponent.role)
    this.range.start = new Date(this.now)
    this.range.end = new Date(this.now)
    this.source = await this.constatService.getByDateChargementInRange(this.myFormattedDate, this.myFormattedDate)
   // console.log(this.myFormattedDate)
    let idUser = localStorage.getItem(PagesComponent.userId)
    this.idInspecteur = (await this.inspecteurService.getByUserId(+idUser)).id
  }

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
      unite: {
        title: 'Unite',
        type: 'text',
        valuePrepareFunction: (value) => { return value.matricule },
        filterFunction(obj?: any, search?: string): boolean {
          if (obj.intitule.toLowerCase().indexOf(search) > -1 || obj.intitule.toUpperCase().indexOf(search) > -1)
            return true;
          return false;
        },
      },
      constat: {
        title: '',
        type: 'custom',
        renderComponent: PdfPageCreatorComponent,
        filter: false,
        show: false,
        addable: false,
        editable: false,
        width: '11px',
      },
    },
  }





  onCostum(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      localStorage.setItem('EstorageConstat', '1');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/constatPage']));
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('id', event.data.id);
      this.windowService.open(PagePdfViewrComponent, { title: 'Constat' });
    }
  }

  async onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer cet constat`)) {
      event.confirm.resolve(
        await this.constatService.deleteConstatById(event.data.id),
        this.source.filter(p => p !== event.data),
        this.toastrService.warning("Succès", "Constat supprimé")
      );
    } else {
      event.confirm.reject();
    }
  }

  redirectToConstatPage() {
    localStorage.setItem("EstorageConstat", "0")
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/constatPage']));
  }


  async handleRangeChange(SimpleChange) {
    if (this.SelectGroupValue[0] != "All" && this.SelectGroupValue[0] != "Archive") {
      if (this.range.end != null) {
        this.source = await this.constatService.getByDateChargementInRange(this.pipe.transform(this.range.start, 'yyyy-MM-dd'), this.pipe.transform(this.range.end, 'yyyy-MM-dd'))
      }
    }
  }

  async updateSelectGroupValue(value) {
    this.SelectGroupValue = value;
    this.cdGButon.markForCheck();
    if (this.SelectGroupValue[0] === "All") { this.source = await this.constatService.getAll() }
    if (this.SelectGroupValue[0] === "owner") 
    { this.source = await this.constatService.getByInspecteurCh(this.idInspecteur) 
    this.source.concat(await this.constatService.getByInspecteurDch(this.idInspecteur) )}
  }




}
