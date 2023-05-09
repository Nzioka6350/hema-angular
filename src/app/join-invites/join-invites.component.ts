import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../base.service';
import { ChartsService } from '../charts.service';
import { JoinInvitesResponse } from '../interfaces/joinInvite';

declare let google: any;

@Component({
  selector: 'app-join-invites',
  templateUrl: './join-invites.component.html',
  styleUrls: ['./join-invites.component.scss']
})
export class JoinInvitesComponent implements OnInit {

  joinInvites: JoinInvitesResponse | undefined

  close() {
    this.sidenav = undefined
  }

  get_invites() {
    this.http.get(this.base.base_uri_api + 'invites', { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          // console.log(response.body);
          this.joinInvites = response.body
        }
      }
    })
  }

  sidenav: string | undefined
  @ViewChild('chart_div') chartDiv: ElementRef | undefined

  constructor(private charts: ChartsService, private http: HttpClient, private base: BaseService) {
    if (this.charts.loaded) {
      let interval = setInterval(() => {
        if (this.chartDiv) {
          clearInterval(interval)
          this.drawChart()
        }
      }, 500, [this])
    } else {
      this.charts.changed.subscribe(() => {
        let interval = setInterval(() => {
          if (this.chartDiv) {
            clearInterval(interval)
            this.drawChart()
          }
        }, 500, [this])
      })
    }
  }
  ngOnInit(): void {
    this.get_invites()
  }

  drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Salary');
    data.addColumn('boolean', 'Full Time Employee');
    data.addRows([
      ['Mike', { v: 10000, f: '$10,000' }, true],
      ['Jim', { v: 8000, f: '$8,000' }, false],
      ['Alice', { v: 12500, f: '$12,500' }, true],
      ['Bob', { v: 7000, f: '$7,000' }, true],
      ['Jim', { v: 8000, f: '$8,000' }, false],
      ['Alice', { v: 12500, f: '$12,500' }, true],
      ['Bob', { v: 7000, f: '$7,000' }, true]
    ]);

    var table = new google.visualization.Table(this.chartDiv?.nativeElement);

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
  }
}
