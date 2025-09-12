export type Card = {
  id: string
  title: string
  description: string
  responsable: string
  tipo: string
  comentarios: Comment[]
}

export type Comment = {
  id: string
  autor: string
  texto: string
  fecha: string
}
