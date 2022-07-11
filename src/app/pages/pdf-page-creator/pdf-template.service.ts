import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { DommageItemService } from '../constat/modal-dommage-item/dommage-item.service';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';
import { PagesComponent } from '../pages.component';

@Injectable({
  providedIn: 'root'
})
export class PdfTemplateService {

  retrievedImage: any;
  retrievedImageListCh = []
  retrievedImageListDch = []
  retrievedImageName: any;
  base64Data: any;
  retrieveResonse: any;
  res: any;
  resListCh: any
  resListDch: any
  sizePlombFiled 






  constructor(private constatService: ConstatService,
    private dommageItemService: DommageItemService) { }



  getText(value: string) {
    if (value != null)
      return value
    else return ""
  }

  CalculateIdemTxt(description : string)
  {
    if (description.length > 11 )
    return "Idem"
    else {return "Idem\n"}
  }

  calculateCoche(value: boolean) {
    if (value) { return { text: 'X', bold: true } }
    else { return { text: 'X', bold: true, color: "#FFFFFF" } }
  }


   prepareImage(i, listImage) {
    if (!!listImage[i]) { return listImage[i] }
    else { return  PagesComponent.blankImage
    }
  }

  calculatePlombField(PlombText: string) {
    let result = PlombText.length ? PlombText.trim().split('@') : []
    if (result.length === 1) {
      this.sizePlombFiled = "*"
      return ['Plomb : ', { text: result, bold: true }]
    }
    if (result.length > 1) {
      PlombText = PlombText.replace("@", ' | ')
      PlombText = PlombText.replace("@", ' | ')
      this.sizePlombFiled = 190
      return ['Plomb : ', { text: PlombText, fontSize: 10 },]
    }
    if (result.length === 0) {
      this.sizePlombFiled = "*"
      return ['Plomb : ', { text: "", bold: true }]
    }
  }

  calculateSecondPageImage(constat: Constat, colorCh: string, colorDch: string, insCh : string , insDch: string, listImage, phase: string) {
    if (listImage.length > 6) {
      let titeVisual
      let titeVisualColor
      if (phase == "chargement") {
        titeVisual = "VISUEL CHAREMENT",
        titeVisualColor = colorCh
      }
      if (phase == "dechargement") {
        titeVisual = "VISUEL DECHAREMENT",
        titeVisualColor = colorDch
      }
      return [
        { text: '', pageBreak: 'before' },
        {
          alignment: 'center',
          columns: [
            {
              width: '*',
              alignment: "left",
              margin: [-20, 0, 0, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'general@esurveys.fr\nTEL: +33 (0) 495 069 230',
            },
            {
              width: 140,
              alignment: 'center',
              margin: [-85, -20, 0, 0],
              text: 'CONSTAT DE SURVEILLANCE',
              style: 'title',
            },
            {
              width: 150,
              alignment: "right",
              margin: [0, 0, -20, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'www.esurveys.fr\nFAX: +33(0) 491 467 892'
            },
          ]
        },
        {
          canvas: [
            {
              type: 'rect',
              x: -1,
              y: 15,
              w: 518,
              h: 70,
              r: 5,
              lineColor: 'black',
              lineWidth: 2
            },
          ]
        },

        {
          style: 'headTable',
          layout: 'headerLineOnly',
          absolutePosition: { x: 90, y: 88 },
          table: {
            widths: [70, "auto", "auto"],
            body: [
              [{ text: constat.voyage.bateau.intitule, alignment: 'center', margin: [-100, 17, 0, 0] },
              {
                table: {
                  body: [
                    [
                      { text: 'Chargement', bold: true, color: colorCh, alignment: 'center' },
                      { text: 'Dechargement', bold: true, color: colorDch, alignment: 'center' }],
                    [{
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portChargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateChargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'noBorders',
                    },
                    {
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portDechargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateDechargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'headerLineOnly',
                    }
                    ],
                  ],
                },
                margin: [-10, -5, 0, 0]
              },
              {
                table: {
                  widths: ['*', "*"],
                  body: [
                    [{ text: 'Inspecteur', bold: true, colSpan: 2 }, ''],
                    [{ text: '1', bold: true, color: colorCh }, { text: insCh, bold: true, color: colorCh }],
                    [{ text: '2', bold: true, color: colorDch }, { text: insDch, bold: true, color: colorDch },]

                  ]
                },
                layout: 'headerLineOnly',
              }]
            ]
          }
        },
        {
          columns: [
            {
              width: '*',
              text: ['ID : ', { text: constat.unite.matricule, bold: true },]
            },
            {
              width: this.sizePlombFiled,
              text: this.calculatePlombField(constat.plombCode)
            },
            {
              width: '*',
              text: ['Type : ', { text: constat.unite.type.intitule, bold: true, italics: true },]
            },
            {
              width: '*',
              text: ['Chargeur : ', { text: constat.chargeur.intitule, bold: true },]
            }
          ]
        },
        { text: '.................................................................................................................................................................', alignment: 'center', },
        { text: titeVisual+" 2", alignment: 'center', bold: true, fontSize: 20 ,color: titeVisualColor },
        {

          style: 'tableExample',
          table: {
            heights: 190,
            width: 250,
            body: [
              [

                {
                  image: this.prepareImage(6, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },

                {
                  image: this.prepareImage(7, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },
              ],
              [
                {
                  image: this.prepareImage(8, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },

                {
                  image: this.prepareImage(9, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },
              ],
              [
                {
                  image: this.prepareImage(10, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },

                {
                  image: this.prepareImage(11, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },
              ]
            ]
          }
        },
      ]
    }
  }

  calculateFirstPageImage(constat: Constat, colorCh: string, colorDch: string, insCh : string , insDch: string, listImage, phase: string) {
    if (listImage.length > 0) {
      let titeVisual
      let titeVisualColor
      if (phase == "chargement") {
        titeVisual = "VISUEL CHAREMENT",
        titeVisualColor = colorCh
      }
      if (phase == "dechargement") {
        titeVisual = "VISUEL DECHAREMENT",
        titeVisualColor = colorDch
      }
      return [
        { text: '', pageBreak: 'before' },
        {
          alignment: 'center',
          columns: [
            {
              width: '*',
              alignment: "left",
              margin: [-20, 0, 0, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'general@esurveys.fr\nTEL: +33 (0) 495 069 230',
            },
            {
              width: 140,
              alignment: 'center',
              margin: [-85, -20, 0, 0],
              text: 'CONSTAT DE SURVEILLANCE',
              style: 'title',
            },
            {
              width: 150,
              alignment: "right",
              margin: [0, 0, -20, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'www.esurveys.fr\nFAX: +33(0) 491 467 892'
            },
          ]
        },
        {
          canvas: [
            {
              type: 'rect',
              x: -1,
              y: 15,
              w: 518,
              h: 70,
              r: 5,
              lineColor: 'black',
              lineWidth: 2
            },
          ]
        },

        {
          style: 'headTable',
          layout: 'headerLineOnly',
          absolutePosition: { x: 90, y: 88 },
          table: {
            widths: [70, "auto", "auto"],
            body: [
              [{ text: constat.voyage.bateau.intitule, alignment: 'center', margin: [-100, 17, 0, 0] },
              {
                table: {
                  body: [
                    [
                      { text: 'Chargement', bold: true, color: colorCh, alignment: 'center' },
                      { text: 'Dechargement', bold: true, color: colorDch, alignment: 'center' }],
                    [{
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portChargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateChargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'noBorders',
                    },
                    {
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portDechargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateDechargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'headerLineOnly',
                    }
                    ],
                  ],
                },
                margin: [-10, -5, 0, 0]
              },
              {
                table: {
                  widths: ['*', "*"],
                  body: [
                    [{ text: 'Inspecteur', bold: true, colSpan: 2 }, ''],
                    [{ text: '1', bold: true, color: colorCh }, { text: insCh, bold: true, color: colorCh }],
                    [{ text: '2', bold: true, color: colorDch }, { text: insDch, bold: true, color: colorDch },]

                  ]
                },
                layout: 'headerLineOnly',
              }]
            ]
          }
        },
        {
          columns: [
            {
              width: '*',
              text: ['ID : ', { text: constat.unite.matricule, bold: true },]
            },
            {
              width: this.sizePlombFiled,
              text: this.calculatePlombField(constat.plombCode)
            },
            {
              width: '*',
              text: ['Type : ', { text: constat.unite.type.intitule, bold: true, italics: true },]
            },
            {
              width: '*',
              text: ['Chargeur : ', { text: constat.chargeur.intitule, bold: true },]
            }
          ]
        },
        { text: '.................................................................................................................................................................', alignment: 'center', },
        { text: titeVisual+" 1", alignment: 'center', bold: true, fontSize: 20 ,color: titeVisualColor },
        {

          style: 'tableExample',
          table: {
            heights: 190,
            width: 250,
            body: [
              [

                {
                  image: this.prepareImage(0, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },

                {
                  image: this.prepareImage(1, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },
              ],
              [
                {
                  image: this.prepareImage(2, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },

                {
                  image: this.prepareImage(3, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },
              ],
              [
                {
                  image: this.prepareImage(4, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },

                {
                  image: this.prepareImage(5, listImage),
                  width: 250,
                  height: 150,
                  margin: [0, 20, 0, 0],
                },
              ]
            ]
          }
        },
      ]
    }
  }

  public async getDocumentDefinition(constat: Constat) {
    let insCh
    let insDch
    let colorCh = '#ba0737'
    let colorDch = '#0676c6'
    if (!!constat.inspecteurChargement) {
      insCh = constat.inspecteurChargement.nom.substring(0, 1).toUpperCase() + constat.inspecteurChargement.prenom.substring(0, 1).toUpperCase()
    } else { insCh = "" }
    if (!!constat.inspecteurDechargement) {
      insDch = constat.inspecteurDechargement.nom.substring(0, 1).toUpperCase() + constat.inspecteurDechargement.prenom.substring(0, 1).toUpperCase()
    } else insDch = ""

    //paroucourire images chargement
    this.resListCh = await this.constatService.getimagesByConstatAndPhase(constat.id , "chargement");
    this.resListCh.forEach(element => {
      this.res = element
      this.retrieveResonse = this.res;
      this.retrievedImageName = this.res.name;
      this.base64Data = this.retrieveResonse.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImageListCh.push(this.retrievedImage)
    });

    //paroucourire images dechargement
    this.resListDch = await this.constatService.getimagesByConstatAndPhase(constat.id , "dechargement");
    this.resListDch.forEach(element => {
      this.res = element
      this.retrieveResonse = this.res;
      this.retrievedImageName = this.res.name;
      this.base64Data = this.retrieveResonse.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImageListDch.push(this.retrievedImage)
    });


    //***************************************************************************************************** */
    //prepare tableau des dommage chargement
    let listItemCh = await this.dommageItemService.getByConstatIdAndPhase(constat.id, "chargement")
    let dommageItemsBodyCh = []
    let listItemDch = await this.dommageItemService.getByConstatIdAndPhase(constat.id, "dechargement")
    let dommageItemsBodyDch = []
    dommageItemsBodyCh.push([{ text: 'PHASE 1 : CHARGEMENT', color: colorCh, bold: true, colSpan: 6, alignment: 'center', fontSize: 12 }, {}, {}, {}, {}, {}])
    dommageItemsBodyCh.push([{ text: 'Description', fontSize: 9, bold: true }, { text: 'Posi', fontSize: 9, bold: true }, { text: 'Dommage', fontSize: 9, bold: true }, { text: 'Dim/\nNbr', fontSize: 9, bold: true }, { text: 'Detail', fontSize: 9, bold: true }, { text: 'Ancien', fontSize: 9, bold: true }]);
    for (let index = 0; index < listItemCh.length; index++) {
      dommageItemsBodyCh.push([
        { text: this.getText(listItemCh[index].dommage.intitule), fontSize: 8 },
        { text: this.getText(listItemCh[index].position), fontSize: 8 },
        { text: this.getText(listItemCh[index].dommageValue), fontSize: 8 },
        { text: "lo. " + this.getText(listItemCh[index].longeur) + this.getText(listItemCh[index].unite) + " \nla. " + this.getText(listItemCh[index].largeur), fontSize: 8 },
        { text: this.getText(listItemCh[index].detail), fontSize: 8 },
        { text: this.getText(listItemCh[index].anciennete), fontSize: 8 }
      ])
    }
    //caluculer l'espace blanc dans le tableau chargement
    for (let index = 0; index < listItemDch.length; index++) {
      dommageItemsBodyCh.push([
        { text: this.getText(listItemDch[index].dommage.intitule), fontSize: 8,color: "#FFFFFF" },
        { text: this.getText(listItemDch[index].position), fontSize: 8,color: "#FFFFFF" },
        { text: this.getText(listItemDch[index].dommageValue), fontSize: 8 ,color: "#FFFFFF"},
        { text: "lo. " + this.getText(listItemDch[index].longeur) + this.getText(listItemDch[index].unite) + " \nla. " + this.getText(listItemDch[index].largeur), fontSize: 8,color: "#FFFFFF" },
        { text: this.getText(listItemDch[index].detail), fontSize: 8 ,color: "#FFFFFF"},
        { text: this.getText(listItemDch[index].anciennete), fontSize: 8,color: "#FFFFFF" }
      ])
    }
    
    //***************************************************************************************************** */
    //prepare tableau des dommage dechargement

    dommageItemsBodyDch.push([{ text: 'PHASE 2 : DECHARGEMENT', color: colorDch, bold: true, colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}])
    dommageItemsBodyDch.push([{ text: 'Description', fontSize: 9, bold: true }, { text: 'Posi', fontSize: 9, bold: true }, { text: 'Dommage', fontSize: 9, bold: true }, { text: 'Dim/\nNbr', fontSize: 9, bold: true }, { text: 'Detail', fontSize: 9, bold: true }, { text: 'Ancien', fontSize: 9, bold: true }])
    //************************************************* */
    //calculer idem
    if (!!constat.inspecteurDechargement)
      for (let index = 0; index < listItemCh.length; index++) {
        dommageItemsBodyDch.push([
          { text: this.CalculateIdemTxt(listItemCh[index].dommage.intitule), fontSize: 8 },
          { text: this.getText(listItemCh[index].position), fontSize: 8, color: "#FFFFFF" },
          { text: this.getText(listItemCh[index].dommageValue), fontSize: 8, color: "#FFFFFF" },
          { text: "lo. " + this.getText(listItemCh[index].longeur) + this.getText(listItemCh[index].unite) + " \nla. " + this.getText(listItemCh[index].largeur), fontSize: 8, color: "#FFFFFF" },
          { text: this.getText(listItemCh[index].detail), fontSize: 8, color: "#FFFFFF" },
          { text: this.getText(listItemCh[index].anciennete), fontSize: 8, color: "#FFFFFF" }
        ])
      }

    //****************** */
    //dommage dechargement
    for (let index = 0; index < listItemDch.length; index++) {
      dommageItemsBodyDch.push([
        { text: this.getText(listItemDch[index].dommage.intitule), fontSize: 8 },
        { text: this.getText(listItemDch[index].position), fontSize: 8 },
        { text: this.getText(listItemDch[index].dommageValue), fontSize: 8 },
        { text: "lo. " + this.getText(listItemDch[index].longeur) + this.getText(listItemDch[index].unite) + " \nla. " + this.getText(listItemDch[index].largeur), fontSize: 8 },
        { text: this.getText(listItemDch[index].detail), fontSize: 8 },
        { text: this.getText(listItemDch[index].anciennete), fontSize: 8 }
      ])
    }




    return {
      footer: function (page) {
        if (page == 1)
          return { margin: [20, 0, 0, 0], fontSize: 9, text: '*RG=RAGUER    DF=DEFORMER CS=CASSER   CP=COUPER   MA=MANQUANT   FR=FROTTER   DH=DECHIRER   PF=PERFORER \n  RAP=RAPIECER    RG/DF=RAGUER&DEFORMER' }

      },
      watermark: { text: 'e-surveys', angle: 60, opacity: 0.1 },
      content: [
        {
          alignment: 'center',
          columns: [
            {
              width: '*',
              alignment: "left",
              margin: [-20, 0, 0, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'general@esurveys.fr\nTEL: +33 (0) 495 069 230',
            },
            {
              width: 140,
              alignment: 'center',
              margin: [-85, -20, 0, 0],
              text: 'CONSTAT DE SURVEILLANCE',
              style: 'title',
            },
            {
              width: 150,
              alignment: "right",
              margin: [0, 0, -20, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'www.esurveys.fr\nFAX: +33(0) 491 467 892'
            },
          ]
        },
        {
          canvas: [
            {
              type: 'rect',
              x: -1,
              y: 15,
              w: 518,
              h: 70,
              r: 5,
              lineColor: 'black',
              lineWidth: 2
            },
          ]
        },

        {
          style: 'headTable',
          layout: 'headerLineOnly',
          absolutePosition: { x: 90, y: 88 },
          table: {
            widths: [70, "auto", "auto"],
            body: [
              [{ text: constat.voyage.bateau.intitule, alignment: 'center', margin: [-100, 17, 0, 0] },
              {
                table: {
                  body: [
                    [
                      { text: 'Chargement', bold: true, color: colorCh, alignment: 'center' },
                      { text: 'Dechargement', bold: true, color: colorDch, alignment: 'center' }],
                    [{
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portChargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateChargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'noBorders',
                    },
                    {
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portDechargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateDechargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'headerLineOnly',
                    }
                    ],
                  ],
                },
                margin: [-10, -5, 0, 0]
              },
              {
                table: {
                  widths: ['*', "*"],
                  body: [
                    [{ text: 'Inspecteur', bold: true, colSpan: 2 }, ''],
                    [{ text: '1', bold: true, color: colorCh }, { text: insCh, bold: true, color: colorCh }],
                    [{ text: '2', bold: true, color: colorDch }, { text: insDch, bold: true, color: colorDch },]

                  ]
                },
                layout: 'headerLineOnly',
              }]
            ]
          }
        },
        {
          columns: [
            {
              width: '*',
              text: ['ID : ', { text: constat.unite.matricule, bold: true },]
            },
            {
              width: this.sizePlombFiled,
              text: this.calculatePlombField(constat.plombCode)
            },
            {
              width: '*',
              text: ['Type : ', { text: constat.unite.type.intitule, bold: true, italics: true },]
            },
            {
              width: '*',
              text: ['Chargeur : ', { text: constat.chargeur.intitule, bold: true },]
            }
          ]
        },
        { text: '.................................................................................................................................................................', alignment: 'center', },
        //table des dommages 
        {
          columns: [
            {
              width: "*",
              style: 'tableExample',
              table: {
                headerRows: 1,
                body: dommageItemsBodyCh
              },
              layout: {
                hLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                },
                vLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                },
                hLineColor: function (i, node) {
                  return 'black';
                },
                vLineColor: function (i, node) {
                  return 'black';
                },
                hLineStyle: function (i, node) {
                  if (i === 0 || i === node.table.body.length) {
                    return null;
                  }
                  return { dash: { length: 10, space: 4 } };
                },
                vLineStyle: function (i, node) {
                  if (i === 0 || i === node.table.widths.length) {
                    return null;
                  }
                  return { dash: { length: 4 } };
                },
              }
            },

            {
              width: '*',
              style: 'tableExample',
              table: {
                headerRows: 1,
                body: dommageItemsBodyDch
              },
              layout: {
                hLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                },
                vLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                },
                hLineColor: function (i, node) {
                  return 'black';
                },
                vLineColor: function (i, node) {
                  return 'black';
                },
                hLineStyle: function (i, node) {
                  if (i === 0 || i === node.table.body.length) {
                    return null;
                  }
                  return { dash: { length: 10, space: 4 } };
                },
                vLineStyle: function (i, node) {
                  if (i === 0 || i === node.table.widths.length) {
                    return null;
                  }
                  return { dash: { length: 4 } };
                },
              }
            },
          ]
        },

        //remarque
        {
          absolutePosition: { x: 40, y: 700 },
          columns: [
            {
              width: '*',
              style: 'tableExample',
              table: {
                widths: [250, 250,],
                heights: [10, 50],

                body: [
                  [[
                    {
                      table: {
                        body: [
                          [
                            { text: 'Expertise :', border: [false, false, false, false], bold: true },
                            { text: 'C', color: colorCh }, this.calculateCoche(constat.expertiseCh),
                            { text: 'D', color: colorDch }, this.calculateCoche(constat.expertiseDch)
                          ],

                        ]
                      },
                    }
                  ], [
                    {
                      table: {
                        body: [
                          [
                            { text: 'Interchange :', border: [false, false, false, false], bold: true },
                            { text: 'C', color: colorCh }, this.calculateCoche(constat.interchangeCh),
                            { text: 'D', color: colorDch }, this.calculateCoche(constat.interchangeDch)
                          ],
                        ]
                      },
                    }
                  ]],
                  [{ text: constat.remarqueChargement, italics: true, color: 'gray' }, { text: constat.remarqueDechargement, italics: true, color: 'gray' }]
                ]
              }
            },

          ],
        },
        //prapare 1ere page pour image chargement
        this.calculateFirstPageImage(constat,colorCh,colorDch,insCh,insDch,this.retrievedImageListCh, "chargement"),
        //prapare 2emme page pour image chargement
        this.calculateSecondPageImage(constat,colorCh,colorDch,insCh,insDch,this.retrievedImageListCh, "chargement"),
        //prapare 1ere page pour image dechargement
        this.calculateFirstPageImage(constat,colorCh,colorDch,insCh,insDch,this.retrievedImageListDch, "dechargement"),
        //prapare 2emme page pour image dechargement
        this.calculateSecondPageImage(constat,colorCh,colorDch,insCh,insDch,this.retrievedImageListDch, "dechargement"),
        //clean list
        this.retrievedImageListCh = [],
        this.retrievedImageListDch = []
      ],






      styles: {
        footer: {
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        title: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        headTable: {
          margin: [-35, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }

    }
    
  
  }

}
