export class Event {
    public name: string;
    public once: string;
    constructor(name, once) {
        this.name = name;
        this.once = once ? 'once' : 'on'
    }

    run(args) {
        throw new TypeError("Event doesnt have functional")
    }
}