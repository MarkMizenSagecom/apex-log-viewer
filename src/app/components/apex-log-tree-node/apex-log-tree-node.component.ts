import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TreeNode } from '../../models/tree';
import { TreeService } from '../../services/tree/tree.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'apex-log-tree-node',
  template: `<div class="node" [ngClass]="{ 'node--last': last }" #node>
    <button
      *ngIf="hasChildren"
      sds-tooltip
      [tooltipContent]="data?.children?.length?.toString()"
      class="node__button"
      (click)="handleClick($event)"
      position="left"
      type="button">
      <span>{{ showChildren ? '-' : '+' }}</span>
    </button>
    <div class="node__item">
      <div class="node__label" (click)="handleClick($event)">{{data?.label}}</div>
      <div class="node__details"><span>{{ details }}</span></div>
    </div>
    <div *ngIf="showChildren && hasChildren" class="node__children">
      <div class="bar" (click)="scrollToNode(node)"></div>
      <apex-log-tree-node
        *ngFor="let child of data.children; let i = index"
        [data]="child"
        [last]="(i + 1 === data?.children?.length)"
      ></apex-log-tree-node>
    </div>
  </div>`,
  styleUrls: ['./apex-log-tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApexLogTreeNodeComponent implements OnInit, OnDestroy {

  @Input()
  data: TreeNode;

  @Input()
  last: boolean;

  showChildren = false;

  private _subscription: Subscription;

  constructor(
    private _treeService: TreeService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.hasChildren) {
      this._subscription = this._treeService.expand$.subscribe((value) => {
        if(this.showChildren === value){
          return;
        }
        this.showChildren = value;
        this._cd.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  get hasChildren(): boolean {
    return Boolean(this.data?.children && this.data?.children?.length > 0);
  }

  scrollToNode(element: HTMLElement):void {
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  handleClick(event: MouseEvent): void {
    event.preventDefault();
    this.showChildren = !this.showChildren
    this._cd.detectChanges();
  }

  get details(): string {

    // Statements don't have a message. Output line number
    if (this.data?.entry?.type === 'STATEMENT_EXECUTE'){
      return `Line: ${this.data.entry.lineNumber}`;
    }

    if (!this.data?.entry?.message) {
      return '';
    }

    return this.data.entry.message;
  }
}
