export function getGenre(data: number[], genres: { id: number; name: string }[]) {
  return data.map(item => genres.find(genre => genre.id === item)?.name).join(", ");
}
