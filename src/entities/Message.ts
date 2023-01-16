import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@ObjectType()
@Entity()
export default class Message {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Field()
  @Column()
  message: string

  @Field()
  @Column()
  // @ts-ignore-next-line
  actorId: number

  @Field()
  @Column()
  // @ts-ignore-next-line
  conversationId: number

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column()
  updatedAt: Date
}
