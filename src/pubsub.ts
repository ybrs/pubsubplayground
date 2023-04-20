type subscribeCallback = (data: any) => void; 
type unsubscribeFn = ()=>void;

class PubsubChannel {
    subscribers: Set<subscribeCallback>;

    constructor() {
        this.subscribers = new Set()
    }

    subscribe(cb:subscribeCallback): unsubscribeFn {
        this.subscribers.add(cb)
        return ()=>{
            this.subscribers.delete(cb)
        }
    }

    publish(val:any){
        this.subscribers.forEach((cb:subscribeCallback) =>{
            cb(val);
        })
    }
}

export default class Broker {
    channels: {[channel: string] : PubsubChannel;};

    constructor(){
        this.channels = {};
    }

    getChannel(channel:string):PubsubChannel{
        if (!this.channels[channel]){
            this.channels[channel] = new PubsubChannel();
        }   
        return this.channels[channel]
    }

    subscribe(channel:string, cb:subscribeCallback){
        const unsub = this.getChannel(channel).subscribe(cb);
        return unsub;
    }

    publish(channel:string, message: any){
        return this.getChannel(channel).publish(message)
    }

}