import {Component, OnDestroy} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
import {CParser} from 'clarinet';

@Component({
  selector: 'app-upload-json',
  standalone: true,
  imports: [],
  template: `
    <div class="upload-json">
      <input type="file" accept=".json" (change)="onFileSelected($event)"/>
    </div>
  `,
  styleUrl: './upload-json.component.scss'
})
export class UploadJsonComponent implements OnDestroy{
  parsedValues: any[] = [];
  error: string | null = null;
  sub!: Subscription;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.readFile(file).subscribe({
        next: (data) => {
          this.parsedValues.push(data);  // Process each parsed value as it comes
          this.error = null;
        },
        error: (err) => {
          console.error('Parsing error:', err);
          this.error = 'Invalid JSON format';
        },
        complete: () => {
          console.log('File reading completed');
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private readFile(file: File): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const parser = new CParser();
      const decoder = new TextDecoderStream();
      const reader = file.stream().pipeThrough(decoder).getReader();

      parser.onvalue = (value: any) => {
        // Example: Extract specific information from each value
        if (value.someProperty) {
          observer.next(value.someProperty);
        }
      };

      parser.onerror = (error: Error) => {
        observer.error(error);
      };

      const readChunk = async () => {
        try {
          let done = false;
          while (!done) {
            const { value, done: streamDone } = await reader.read();
            if (value) {
              parser.write(value);
            }
            done = streamDone;
          }
          // Finalize the stream decoding
          parser.end();
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      };

      readChunk();
    });
  }
}
