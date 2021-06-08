import { Entity } from "./Entity";
import { IDomainEvent } from "./events/IDomainEvent";
import { EventMediator } from "./events/EventMediator";
import { UniqueEntityID } from "./id/UniqueEntityID";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _eventsQueue: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }
  get domainEvents(): IDomainEvent[] {
    return this._eventsQueue;
  }

  /**
   * @method addDomainEvent
   * @protected
   * @desc
   * 1. Add the domain event to this aggregate's list of domain events
   * 2. Add this aggregate instance to the domain event's list of aggregates who's events it eventually needs to dispatch.
   */
  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._eventsQueue.push(domainEvent);
    EventMediator.markAggregateForDispatch(this);
    this.logDomainEventAdded(domainEvent);
  }

  /**
   * @method clearEvents
   * @public
   * @desc
   */

  clearEvents(): void {
    this._eventsQueue.splice(0, this._eventsQueue.length);
  }

  /**
   * @method logDomainEventAdded
   * @private
   * @desc
   */

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      "==>",
      domainEventClass.constructor.name
    );
  }
}
