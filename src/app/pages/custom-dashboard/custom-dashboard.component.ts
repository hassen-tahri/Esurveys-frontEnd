import { Component, Input, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../@core/utils';

@Component({
  selector: 'ngx-custom-dashboard',
  templateUrl: './custom-dashboard.component.html',
  styleUrls: ['./custom-dashboard.component.scss']
})
export class CustomDashboardComponent implements OnInit {
  type = 'Mois';
  types = ['Semaine', 'Mois', 'Année'];
  option: any = {};
  echartsIntance: any;
  private alive = true;
  options: any = {};

  @Input() linesData: { firstLine: number[]; secondLine: number[] } = {
    firstLine: [],
    secondLine: [],
  };



  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const profitBarAnimationEchart: any = config.variables.profitBarAnimationEchart;

        this.setChartOption(profitBarAnimationEchart);
    });
  }

  setChartOption(chartVariables) {
    this.options = {
      color: [
        chartVariables.firstAnimationBarColor,
        chartVariables.secondAnimationBarColor,
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      legend: {
        data: ['transactions', 'orders'],
        borderWidth: 0,
        borderRadius: 0,
        itemWidth: 15,
        itemHeight: 15,
        textStyle: {
          color: chartVariables.textColor,
        },
      },
      tooltip: {
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          color: chartVariables.tooltipTextColor,
          fontWeight: chartVariables.tooltipFontWeight,
          fontSize: chartVariables.tooltipFontSize,
        },
        position: 'top',
        backgroundColor: chartVariables.tooltipBg,
        borderColor: chartVariables.tooltipBorderColor,
        borderWidth: chartVariables.tooltipBorderWidth,
        formatter: params => `$ ${Math.round(parseInt(params.value, 10))}`,
        extraCssText: chartVariables.tooltipExtraCss,
      },
      xAxis: [
        {
          data: this.linesData.firstLine.map((_, index) => index),
          silent: false,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: chartVariables.splitLineStyleColor,
              opacity: chartVariables.splitLineStyleOpacity,
              width: chartVariables.splitLineStyleWidth,
            },
          },
        },
      ],
      series: [
        {
          name: 'transactions',
          type: 'bar',
          data: this.linesData.firstLine,
          animationDelay: idx => idx * 10,
        },
        {
          name: 'orders',
          type: 'bar',
          data: this.linesData.secondLine,
          animationDelay: idx => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
