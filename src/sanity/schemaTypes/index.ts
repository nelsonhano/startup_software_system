import { type SchemaTypeDefinition } from 'sanity'
import { playlist } from './playlist '
import { startup } from './startup'
import { author } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist],
}
