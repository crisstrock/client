import { Injectable } from '@angular/core';
//import sobject to refresh view
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageProductoService {
  subject = new Subject()

  constructor() { }

  setMessage(msg){
    this.subject.next(msg)
  }

  getMessage(){
    return this.subject.asObservable()
  }
  
}
