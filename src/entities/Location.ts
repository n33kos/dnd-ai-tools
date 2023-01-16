import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@ObjectType()
@Entity()
export default class Location {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  // @ts-ignore-next-line
  campaignId: number

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column()
  updatedAt: Date
}
