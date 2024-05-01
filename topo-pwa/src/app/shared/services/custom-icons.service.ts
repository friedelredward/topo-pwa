import {Injectable} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MOUSE_ICON, SvgIcon} from "../model/icons";

@Injectable({
  providedIn: 'root'
})
export class CustomIconsService {
  constructor(private iconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer
  ) {
    this.registerIcons(MOUSE_ICON);
  }

  private registerIcons(...icons: SvgIcon[]) {
    icons.forEach((icon: SvgIcon) => {
      const safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${icon.url}`);
      this.iconRegistry.addSvgIcon(icon.label, safeUrl);
    });
  }
}
