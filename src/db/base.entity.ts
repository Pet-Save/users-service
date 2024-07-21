import { Property } from '@mikro-orm/core';


export class BaseEntity{
    @Property({ onCreate: () => new Date() })
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    createdBy: string;
  
    @Property()
    updatedBy: string;
}