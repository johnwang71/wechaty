/**
 * Wechat for Bot. Connecting ChatBots
 *
 * Interface for Puppet
 *
 * Class Puppet
 *
 * Licenst: ISC
 * https://github.com/wechaty/wechaty
 *
 */

import { EventEmitter } from 'events'

import {
  Sayable
}               from './config'
import Contact  from './contact'
import Message  from './message'
import Room     from './room'
import log      from './brolog-env'

// type ContactGetterFunc = {
//   (id: string): Promise<any>
// }

export abstract class Puppet extends EventEmitter implements Sayable {
  public userId:  string  | null
  public user:    Contact | null
  public abstract getContact(id: string): Promise<any>

  private _targetState:   string
  private _currentState:  string

  constructor() {
    super()

    /*
     * @deprecated
     * connected / disconnected
     * connecting / disconnecting
     */
    // this._readyState = 'disconnected'

    this.targetState('dead')
    this.currentState('dead')
  }

  // targetState : 'live' | 'dead'
  public targetState(newState?) {
    if (newState) {
      log.verbose('Puppet', 'targetState(%s)', newState)
      this._targetState = newState
    }
    return this._targetState
  }

  // currentState : 'birthing' | 'killing'
  public currentState(newState?) {
    if (newState) {
      log.verbose('Puppet', 'currentState(%s)', newState)
      this._currentState = newState
    }
    return this._currentState
  }

  public abstract async init(): Promise<this>
  /**
   * @deprecated
   * use Message.self() instead
   */
  public abstract self(message?: Message): boolean

  // public user(contact?: Contact) {
  //   if (contact) {
  //     this._user = contact
  //   }
  //   return this._user
  // }

  public abstract send(message: Message): Promise<void>
  public abstract say(content: string): Promise<void>

  // @deprecated
  public abstract reply(message: Message, reply): Promise<void>

  public abstract reset(reason?: string): void
  public abstract logout(): Promise<void>
  public abstract quit(): Promise<void>

  public abstract ding(): Promise<string>

  /**
   * FriendRequest
   */
  public abstract friendRequestSend(contact: Contact, hello?: string): Promise<any>
  public abstract friendRequestAccept(contact: Contact, ticket: string): Promise<any>

  /**
   * Room
   */
  public abstract roomAdd(room: Room, contact: Contact): Promise<number>
  public abstract roomDel(room: Room, contact: Contact): Promise<number>
  public abstract roomTopic(room: Room, topic: string): Promise<string>
  public abstract roomCreate(contactList: Contact[], topic?: string): Promise<Room>
  public abstract roomFind(filterFunc: string): Promise<Room[]>

  /**
   * Contact
   */
  public abstract contactFind(filterFunc: string): Promise<Contact[]>
}

export default Puppet
