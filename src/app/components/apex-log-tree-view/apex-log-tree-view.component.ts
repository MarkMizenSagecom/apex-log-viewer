import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { LogEntry } from '../../models/log-entry';
import { TreeNode } from '../../models/tree';
import { TreeService } from '../../services/tree/tree.service';

@Component({
  selector: 'apex-log-tree-view',
  template: `<div class="log-tree">
    <ng-container *ngIf="!loading; else loadingTemplate">
      <!--
        This is not going to be added now as it's render blocking and takes a long while with large log files
        <sds-button (clickEvent)="expand()">Expand All</sds-button>
      -->
      <sds-button size="small" (clickEvent)="collapse()">Collapse All</sds-button>
      <div class="log-tree__root" #top>
        <div class="bar" (click)="handleBarClick(top)"></div>
        <apex-log-tree-node [data]="{ label: 'START' }"></apex-log-tree-node>
        <apex-log-tree-node *ngFor="let node of nodes" [data]="node"></apex-log-tree-node>
        <apex-log-tree-node [data]="{ label: 'END' }"></apex-log-tree-node>
      </div>
    </ng-container>
    <ng-template #loadingTemplate>
      <sds-loader size="large"></sds-loader>
    </ng-template>
  </div>`,
  styleUrls: ['./apex-log-tree-view.component.scss']

})
export class ApexLogTreeViewComponent implements OnChanges, OnDestroy {
  @Input() entries: LogEntry[];
  @Input() categories: Map<string, boolean>;

  nodes: TreeNode[];

  private _worker: Worker;

  loading = false;

  constructor(
    private _treeService: TreeService,
    private _cd: ChangeDetectorRef
  ) {
    if (typeof Worker !== 'undefined') {
      this._worker = new Worker('../../workers/tree.worker.ts', { type: 'module' });
      this._worker.onmessage = ({ data }) => this.handleWorkerMessage(data);
    } else {
      console.warn('Service workers not supported');
    }
  }

  ngOnDestroy(): void {
    this._worker.terminate();
  }

  handleWorkerMessage(data: any): void {
    this.loading = false;
    this.nodes = data;
    this._cd.detectChanges();
  }

  private _checkCategories(categories: Map<string, boolean>): boolean {

    if (!categories.get('CODE_UNIT_STARTED') !== !categories.get('CODE_UNIT_FINISHED')) {
      return false;
    }

    if (!categories.get('CONSTRUCTOR_ENTRY') !== !categories.get('CONSTRUCTOR_EXIT')) {
      return false;
    }

    if (!categories.get('METHOD_ENTRY') !== !categories.get('METHOD_EXIT')) {
      return false;
    }

    if (!categories.get('SYSTEM_METHOD_EXIT') !== !categories.get('SYSTEM_METHOD_EXIT')) {
      return false;
    }

    if (!categories.get('SYSTEM_CONSTRUCTOR_ENTRY') !== !categories.get('SYSTEM_CONSTRUCTOR_EXIT')) {
      return false;
    }

    return true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entries) {
      if (!this._checkCategories(this.categories)) {
        console.error('Unsupported categories');
        return;
      }
      this.loading = true;
      const entries = [...changes.entries.currentValue];
      this._worker?.postMessage(entries);
      this._cd.detectChanges();
    }
  }

  expand(): void {
    this._treeService.expand();
    requestAnimationFrame(() => {
      this._cd.detectChanges();
    });
  }

  collapse(): void {
    this._treeService.collapse();
    requestAnimationFrame(() => {
      this._cd.detectChanges();
    });
  }

  handleBarClick(top: HTMLElement): void {
    top?.scrollIntoView({ behavior: 'smooth' });
  }
}
