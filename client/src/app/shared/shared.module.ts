import { CallBtnComponent } from './components/call-btn/call-btn.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CallBtnComponent,
    HamburgerMenuComponent,
    CardComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MaterialModule,
    CallBtnComponent,
    CardComponent,
  ],
})
export class SharedModule {}
