import { CallBtnComponent } from './components/call-btn/call-btn.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { CardComponent } from './components/card/card.component';
import { ShowResultComponent } from './components/show-result/show-result.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CallBtnComponent,
    HamburgerMenuComponent,
    CardComponent,
    ShowResultComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MaterialModule,
    CallBtnComponent,
    CardComponent,
    ShowResultComponent
  ],
})
export class SharedModule {}
