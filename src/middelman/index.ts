type SubscriberCallback = (message: any) => void;

class PubSub {
  private subscribers: { [key: string]: SubscriberCallback[] } = {};

  public publish(key: string, message: any): void {
    if (this.subscribers[key]) {
      this.subscribers[key].forEach((callback) => {
        callback(message);
      });
    }
  }

  public subscribe(key: string, callback: SubscriberCallback): void {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(callback);
  }

}


const pubSubInstance = new PubSub();

export default pubSubInstance