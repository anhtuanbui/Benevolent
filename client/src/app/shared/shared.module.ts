import { CallBtnComponent } from './call-btn/call-btn.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, CallBtnComponent, HamburgerMenuComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent, FooterComponent, MaterialModule, CallBtnComponent],
})
export class SharedModule {}
