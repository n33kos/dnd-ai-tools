import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@ObjectType()
@Entity("items")
export default class Item {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  campaignId: number

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column()
  updatedAt: Date
}
