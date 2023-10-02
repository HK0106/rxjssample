import { Observable } from 'rxjs';
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


const interval$ = new Observable<number>(subscriber => {
  let count = 1;

  const interval = setInterval(() => {
    console.log("emmit", count);
    subscriber.next(count++);
  }, 2000)

  return () => {
    clearInterval(interval);
    console.log("Teardown!")
  }
})

const subscription = interval$.subscribe(value => {console.log(value)});

setTimeout(() => {
  console.log("unsubscribe!");
  subscription.unsubscribe();
}, 7000)