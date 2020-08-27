import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ApexLogViewerComponent } from './components/apex-log-viewer/apex-log-viewer.component';
import { KeywordPanelComponent } from './components/keyword-panel/keyword-panel.component';
import { LogCategoriesComponent } from './components/category-panel/category-panel.component';
import { FileDropperDirective } from './directives/file-dropper.directive';
import { AgGridModule } from 'ag-grid-angular';
import { LogGridViewComponent } from './components/log-viewer-grid/log-viewer-grid.component';
import { ButtonBarModule } from '@sage/ng-carbon/button-bar';
import { ButtonModule } from '@sage/ng-carbon/button';
import { CheckboxModule } from '@sage/ng-carbon/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@sage/ng-carbon/dialog';
import { InputTextModule } from '@sage/ng-carbon/input-text';
import { ButtonToggleModule } from '@sage/ng-carbon/button-toggle';
import { IconModule } from '@sage/ng-carbon/icon';
import { LinkModule } from '@sage/ng-carbon/link';
import { ProgressBarModule } from '@sage/ng-carbon/progress-bar';
import { ApexLogTreeView } from './components/apex-log-tree-view/apex-log-tree-view.component';
import { ApexLogTreeNode } from './components/apex-log-tree-node/apex-log-tree-node.component';
import { LoaderModule } from '@sage/ng-carbon/loader';
import { TooltipModule } from '@sage/ng-carbon/tooltip';
import { TabsModule } from '@sage/ng-carbon/tabs';
import { TreeService } from './services/tree/tree.service';

@NgModule({
  declarations: [
    AppComponent,
    ApexLogViewerComponent,
    KeywordPanelComponent,
    LogCategoriesComponent,
    FileDropperDirective,
    LogGridViewComponent,
    ApexLogTreeView,
    ApexLogTreeNode
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    ButtonBarModule,
    ButtonToggleModule,
    IconModule,
    LinkModule,
    InputTextModule,
    ProgressBarModule,
    CheckboxModule,
    LoaderModule,
    TabsModule,
    TooltipModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    TreeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
