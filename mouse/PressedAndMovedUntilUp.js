console.clear();
//import { Observable } from 'rxjs';


//const Observable=rxjs.Observable;
//console.dir(Observable);


const rxjsOperators=rxjs.operators;
//console.dir(rxjsOperators);

const rxjsFromEvent=rxjs.fromEvent;
//console.dir(rxjsFromEvent);

const mouseMoveObserver = rxjsFromEvent(document,'mousemove');
const mouseDownObserver = rxjsFromEvent(document,'mousedown');
const mouseUpObserver = rxjsFromEvent(document,'mouseup');

mouseUpObserver.subscribe(()=>console.clear());

const logMouseCoord=event=>console.log({x:event.x,y:event.y});

/*
const whenMousePressedIsMoved = mouseMoveObserver.pipe(
  rxjsOperators.skipUntil(mouseDownObserver),
  rxjsOperators.takeUntil(mouseUpObserver),
  rxjsOperators.repeat()
);
*/


const whenMousePressedIsMoved = mouseDownObserver.pipe(
  rxjsOperators.mergeMap(down=>mouseMoveObserver.pipe(rxjsOperators.takeUntil(mouseUpObserver)))
);


whenMousePressedIsMoved.subscribe(logMouseCoord);
whenMousePressedIsMoved.subscribe(event=>console.log(event.x-event.y));



whenMousePressedIsMoved.subscribe({
  next(obj){
    console.log('screenX:',obj.screenX);
  }/*,
  error(catched){
    console.error('Subscribed#1 error:%O',catched);
  },
  complete(){
    console.info('Subscribed#1 done');
  }*/
});










