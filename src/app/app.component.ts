import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'observables-vs-promises';

  constructor() {
    // this.promiseTest01();

    // this.observableTest01();

    // this.observableTestAsync();

    // this.observableTestEmitMultipleValuesOverTime();

    this.observableTestEmitMultipleValuesOverTimeWithPipe();
  }

  promiseTest01(): void {
    const greetingPoster = new Promise((resolve, reject) => {
      console.log('Inside Promise (proof of being eager)');
      resolve('Welcome! Nice to meet you.');
    });

    console.log('Before calling then on Promise');

    greetingPoster.then(res => console.log(`Greeting from promise: ${res}`));
  }

  observableTest01(): void {
    const greetingLady$ = new Observable(observer => {
      console.log('Inside Observable (proof of being lazy)');
      observer.next('Hello! I am glad to get to know you.');
      observer.complete();
    });

    console.log('Before calling subscribe on Observable');

    greetingLady$.subscribe({
      next: (crime) => {
        console.log(`So, the return was: "${crime}"`);
      },
      complete: () => console.log('End of conversation with lady')
    });
  }

  observableTestAsync(): void {
    const tiredGreetingLady$ = new Observable(observer => {
      setTimeout(() => {
        observer.next('Hello! I am glad to get to know you.');
        observer.complete();
      }, 2000);
    });

    console.log('Before calling subscribe on Observable');

    tiredGreetingLady$.subscribe({
      next: (crime) => {
        console.log(crime);
      },
      complete: () => console.log('End of conversation with tired lady')
    });

    console.log('After calling subscribe on Observable (proof of being able to execute async)');
  }

  observableTestEmitMultipleValuesOverTime(): void {
    const notifications$ = new Observable(observer => {
      const interval = setInterval(() => {
        observer.next('New notification');
      }, 2000);

      return () => {
        console.log('Finished.');
        clearInterval(interval);
      }
    });

    const subscription = notifications$.subscribe(console.log);

    setTimeout(() => subscription.unsubscribe(), 8000);
  }

  observableTestEmitMultipleValuesOverTimeWithPipe(): void {
    const notifications$ = new Observable(observer => {
      const interval = setInterval(() => {
        observer.next('New notification');
      }, 2000);

      return () => {
        console.log('Finished');
        clearInterval(interval);
      };
    });

    const enhancedNotifications$ = notifications$.pipe(
      map(message => `${message} ${new Date()}`)
    );

    const subscription = enhancedNotifications$.subscribe(console.log);

    setTimeout(() => subscription.unsubscribe(), 8000);
  }
}
