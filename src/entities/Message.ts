import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from "typeorm"
import Actor from "./Actor"

@ObjectType()
@Entity("messages")
export default class Message {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Field()
  @Column()
  message: string

  @Field()
  @Column()
  actorId: number

  @Field()
  @Column()
  conversationId: number

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column()
  updatedAt: Date

  @ManyToOne(() => Actor, actor => actor.id, { eager: true })
  @JoinColumn({ name: "actorId" })
  actor: Actor
}
