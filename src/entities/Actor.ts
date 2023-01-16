import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Message from "./Message"

@ObjectType()
@Entity("actors")
export default class Actor {
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
  actorType: "NPC" | "PC"

  @Field()
  @Column()
  createdAt: Date

  @Field()
  @Column()
  updatedAt: Date

  messages: Message[]
}
