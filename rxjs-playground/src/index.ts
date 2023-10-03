// import { Observable } from 'rxjs';
//
// const someObservable$ = new Observable<string>(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });
//
// console.log("subscription 1 ")
// someObservable$.subscribe(value => console.log("subscription 1 exec ",value));
//
// setTimeout(() => {
//   console.log("subscription 2 ")
//   someObservable$.subscribe(value => console.log("subscription 2 exec ",value));
// }, 1000)
//
// const observable$ = new Observable<string>(subscriber => {
//   console.log('Observable executed!');
//   subscriber.next("Alpha");
//   subscriber.next("Bravo");
//   setTimeout(() => {
//     subscriber.next("Charlie");
//     subscriber.next("Delta");
//     // subscriber.complete();
//   }, 2000);
//
//   setTimeout(() => {
//     subscriber.error(new Error('Failure'))
//   }, 4000);
//
//   return () => {
//     console.log("Teardown");
//   }
// });
//
// console.log("Before subscribe!");
// observable$.subscribe({
//   next: value => {console.log("observable$.subscribe next 1", value)},
//   error: err => {console.error("observable$.subscribe error 1", err.message)},
//   complete : () => { console.log("observable$.subscribe complete 1")}
// })
// console.log("After subscribe!");

//
// const interval$ = new Observable<number>(subscriber => {
//   let count = 1;
//
//   const interval = setInterval(() => {
//     console.log("emmit", count);
//     subscriber.next(count++);
//   }, 2000)
//
//   return () => {
//     clearInterval(interval);
//     console.log("Teardown!")
//   }
// })
//
// const subscription = interval$.subscribe(value => {console.log(value)});
//
// setTimeout(() => {
//   console.log("unsubscribe!");
//   subscription.unsubscribe();
// }, 7000)


import { fromEvent, interval, merge } from 'rxjs';
import { map, filter, catchError, mergeMap, scan } from 'rxjs/operators';

// Simulated IoT data streams
const device1Stream = interval(1000).pipe(map(() => Math.random() * 100));
const device2Stream = interval(1500).pipe(map(() => Math.random() * 50));

// Merge data streams from multiple devices
const mergedStream = merge(device1Stream, device2Stream);

// Calculate and display average data value in real-time
mergedStream
    .pipe(
        catchError((err) => {
          console.error('Error:', err);
          return err; // Continue with the error
        }),
        scan((acc, val: number) => ({ sum: acc.sum + val, count: acc.count + 1 }), { sum: 0, count: 0 }),
        map((avg) => avg.sum / avg.count)
    )
    .subscribe((average) => {
      console.log('Real-time Average:', average);
      // Update the dashboard UI with the average value
    });
