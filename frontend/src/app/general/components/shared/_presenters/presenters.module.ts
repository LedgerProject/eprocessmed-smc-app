
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../../../../material-module';
// import { PresentersRoutes } from './presenters.routing';

// import { ButtonsComponent } from './buttons/buttons.component';
// import { BadgeComponent } from './badge/badge.component';
// import { CardsComponent } from './cards/cards.component';

@NgModule({
    imports: [
        CommonModule,
        // RouterModule.forChild(PresentersRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CdkTableModule
    ],
    providers: [
    ],
    declarations: [
        // ButtonsComponent,
        // BadgeComponent,
        // CardsComponent
    ],
    exports: [
      // ButtonsComponent,
      // BadgeComponent,
      // CardsComponent
    ]
})
export class PresentersModule { }
