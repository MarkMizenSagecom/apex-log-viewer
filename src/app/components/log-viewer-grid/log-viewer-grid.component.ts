import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LogEntry } from '../../models/log-entry';
import { GridReadyEvent, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';

@Component({
  selector: 'apex-log-viewer-grid',
  template: `<div class="apex-log-viewer-grid">

    <div class="jump">
      Jump to: <sds-link (clickEvent)="scrollToTop()">Top<sds-icon iconType="arrow_up"></sds-icon></sds-link> <sds-link (clickEvent)="scrollToBottom()">Bottom<sds-icon iconType="arrow_down"></sds-icon></sds-link>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 1000px; margin-bottom: 56px; max-height: calc(100vh - 80px);"
      class="ag-theme-alpine"
      [rowData]="rows"
      [columnDefs]="columns"
      [defaultColDef]="defaultColDef"
      [headerHeight]="32"
      [rowHeight]="32"
      (gridReady)="handleGridReady($event)"
      >
    </ag-grid-angular>
  </div>`,
  styleUrls: ['./log-viewer-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogGridViewComponent implements OnChanges {

  defaultColDef: ColDef = {};

  columns: Array<ColDef | ColGroupDef> = [
    {
      headerName: 'Timestamp',
      field: 'timestamp',
      width: 140,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Time Elapsed',
      field: 'timeElapsed',
      width: 130,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Type',
      field: 'type',
      width: 240,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Line',
      field: 'lineNumber',
      width: 120,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Message',
      field: 'message',
      flex: 1,
      autoHeight: true,
      width: 940,
      sortable: true,
      filter: true,
      cellStyle: {
        'white-space': 'normal',
        'overflow-wrap': 'break-word',
      },
    }
  ];


  rows: any[] = [];

  @Input() entries: LogEntry[] = [];

  private _gridApi: GridApi;

  handleGridReady({ api }: GridReadyEvent): void {
    this._gridApi = api;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entries) {
      this._buildRows(changes.entries.currentValue);
    }
  }

  private _buildRows(data: any) {
    this.rows = data
      .map((item: any) => ({
        ...item,
        message: item.message.trimEnd(),
        showButton: item?.type === 'VARIABLE_ASSIGNMENT'
      }));
  }



  scrollToTop() {
    this._gridApi.ensureIndexVisible(0);
  }

  scrollToBottom() {
    this._gridApi.ensureIndexVisible(this.rows.length - 1);
  }


}
