import { Index, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';


export abstract class BaseEntity{
    [OptionalProps]?: 'createdAt' | 'updatedAt';

    @Index()
    @PrimaryKey()
    id!: number;
    
    @Property({ onCreate: () => new Date() })
    createdAt = new Date();
  
    @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    createdBy: string;
  
    @Property()
    updatedBy: string;
}