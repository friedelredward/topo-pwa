import {Component, OnDestroy} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
// import * as JSONStream from 'jsonparse';
// import { Parser } from 'jsonparse';
import * as JSONStream from 'jsonparse';

@Component({
  selector: 'app-upload-json',
  standalone: true,
  imports: [],
  template: `
    <div class="upload-json">
      <input type="file" accept=".json" (change)="onFileChange($event)"/>
    </div>
  `,
  styleUrl: './upload-json.component.scss'
})
export class UploadJsonComponent implements OnDestroy{
  jsonData= {};
  jsonString= '';
  sub!: Subscription;

  onFileChange($event: Event):void{
    // this.sub=this.showJsonText($event).subscribe({
    //   next: (json) => {
    //     // Handle the JSON data here
    //     this.jsonData = json;
    //     console.log(json);
    //   },
    //   error: (err) => {
    //     // Handle any errors here
    //     console.error(err);
    //   },
    //   complete: () => {
    //     // Handle completion of the file reading operation here
    //     console.log('File reading completed');
    //   }
    // });

    // this.sub=this.showJsonStream($event).subscribe({
    //   next: (json) => {
    //     // Handle the JSON data here
    //     this.jsonData = json;
    //     console.log(json);
    //   },
    //   error: (err) => {
    //     // Handle any errors here
    //     console.error(err);
    //   },
    //   complete: () => {
    //     // Handle completion of the file reading operation here
    //     console.log('File reading completed');
    //   }
    // });
    this.sub=this.showJsonStreamObs($event).subscribe({
      next: (json) => {
        // Handle the JSON data here
        //this.jsonData = json;
        // this.jsonString += json;
        console.log(json);
      },
      error: (err) => {
        // Handle any errors here
        console.error(err);
      },
      complete: () => {
        // Handle completion of the file reading operation here
        // this.jsonData = JSON.parse(this.jsonString);
        console.log('File reading completed: ', this.jsonData);
      }
    });
  }

  showJsonText($event: Event): Observable<string> {
    return new Observable((observer) => {
      const input = $event.target as HTMLInputElement;
      if (!input.files) {
        observer.error('No file selected');
        return;
      }
      const file = input.files[0];
      file.text().then(text => {
        try {
          const json = JSON.parse(text);
          observer.next(json);
          observer.complete();
        } catch (error) {
          observer.error('Failed to parse JSON');
        }
      }).catch(() => {
        observer.error('Failed to read file');
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private processText(observer: Observer<string>, chunksObj: { chunks: string }, reader: ReadableStreamDefaultReader<string>)
  :(result: ReadableStreamReadResult<string>) => void {
    return ({ done, value }: ReadableStreamReadResult<string>) => {
      if (done) {
        try {
          console.log(chunksObj);
          const json = JSON.parse(chunksObj.chunks);
          observer.next(json);
          observer.complete();
        } catch (error) {
          observer.error('Failed to parse JSON stream');
        }
        return;
      }

      chunksObj.chunks += value;
      return reader.read().then(this.processText(observer, chunksObj, reader));
    }
  }

  private showJsonStream($event: Event): Observable<string> {
    return new Observable((observer) => {
      const input = $event.target as HTMLInputElement;
      if (!input.files) {
        observer.error('No file selected');
        return;
      }
      const file = input.files[0];
      const textStream = file.stream().pipeThrough(new TextDecoderStream());
      const chunksObj= {chunks: ''};

      const reader = textStream.getReader();
      reader.read().then(this.processText(observer, chunksObj, reader)).catch(() => {
        observer.error('Failed to read file');
      })
    });
  }

  private showJsonStreamObs($event: Event): Observable<unknown> {
    return new Observable((observer) => {
      const input = $event.target as HTMLInputElement;
      if (!input.files) {
        observer.error('No file selected');
        return;
      }
      const file = input.files[0];
      const textStream:ReadableStream<string> = file.stream().pipeThrough(new TextDecoderStream());
      this.readStream(textStream).subscribe({
        next: chunk => observer.next(chunk),
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
    });
  }

  private readStream(textStream: ReadableStream<string>): Observable<string> {
    return new Observable(observer => {
      const reader = textStream.getReader();
      // const parser = new Parser();
      const parser = new JSONStream.Parser();
      parser.onValue = function(value: unknown) {
        if (this.stack.length === 0) {
          observer.next(value as string);
        }
      };

      parser.onError = function(err: Error) {
        observer.error(err);
      };
      const readNextChunk = ({ done, value }: ReadableStreamReadResult<string>): Promise<void> => {
        if (done) {
          observer.complete();
          return Promise.resolve();
        }
        try {
          parser.write(value);
        } catch (error) {
          observer.error('Failed to parse JSON chunk');
          return Promise.resolve();
        }

        // observer.next(value);
        return reader.read().then(readNextChunk);
      };
      reader.read().then(readNextChunk).catch(error => observer.error(error));
    });
  }
}
