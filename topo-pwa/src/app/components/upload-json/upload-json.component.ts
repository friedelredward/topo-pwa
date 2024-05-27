import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-json',
  standalone: true,
  imports: [],
  template: `
    <div class="upload-json">
      <input type="file" accept=".json" />
    </div>
  `,
  styleUrl: './upload-json.component.scss'
})
export class UploadJsonComponent {

}
