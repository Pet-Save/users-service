import { Index, PrimaryKey, Property } from '@mikro-orm/core';


export abstract class BaseEntity{
    @Index()
    @PrimaryKey()
    id!: number;
    
    @Property({ onCreate: () => new Date() })
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    createdBy: string;
  
    @Property()
    updatedBy: string;
}