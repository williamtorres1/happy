import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, // Relacionamento de um orfanato para muitas imagens
  JoinColumn,
} from 'typeorm';

import Image from './Image';

@Entity('orphanages') // Associa o model abaixo com a tabela orphanages
export default class Orphanage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update'],
    // insert/update => automaticamente cadastrar ou atualizar as imagens do Orphanage
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;
}
