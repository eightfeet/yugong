interface EventEmitterEvents {
  [key: string]: Function;
}

class EventEmitter {
  public events: EventEmitterEvents;
  constructor(events?: EventEmitterEvents) {
    this.events = events || {};
  }
  
  public emit(name: string, ...args: any[]) {
    this.events[name](...args);
  }

  public addEventListener(name: string, cb: Function) {
    this.events[name] = cb
  }

  public removeEventListener(name: string, cb: Function){
    delete this.events[name]
  }

  public bind(id: string) {
    return {
      addEventListener: (name: string, cb: Function) =>
        this.addEventListener(`${id}/${name}`, cb),

      removeEventListener: (name: string, fn: Function) =>
        this.removeEventListener(`${id}/${name}`, fn),

      emit: (name: string, ...args: any) => this.emit(`${id}/${name}`, ...args),
    };
  }

  public clear(id:string) {}
  
}

export default EventEmitter;