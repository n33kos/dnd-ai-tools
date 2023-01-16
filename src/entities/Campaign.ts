import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@ObjectType()
@Entity("campaigns")
export default class Campaign {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Field()
  @Column()
  title: string

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
