export type CommentType = {
  id: string
  autor: string
  texto: string
  fecha: string
}

export type CardType = {
  id: string
  title: string
  description: string
  responsable: string
  tipo: string
  comentarios: CommentType[]
}

export type ColumnType = {
  id: string
  title: string
  cards: CardType[]
}
