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

const observable$ = new Observable(subscriber => {
  console.log('Observable executed!');
});

console.log("Before subscribe!");
observable$.subscribe()
console.log("After subscribe!");
