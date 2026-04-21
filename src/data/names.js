const NAMES = [
  'Ádám', 'Balázs', 'Csaba', 'Dániel', 'Eszter',
  'Ferenc', 'Gábor', 'Hajnalka', 'István', 'Judit',
  'Károly', 'László', 'Márton', 'Nóra', 'Orsolya',
  'Péter', 'Réka', 'Sándor', 'Tamás', 'Ágnes',
  'Béla', 'Csilla', 'Dénes', 'Emese', 'Flóra',
  'Géza', 'Hanna', 'Imre', 'Julianna', 'Kálmán',
]

export function getRandomNames(count) {
  return [...NAMES].sort(() => Math.random() - 0.5).slice(0, count)
}
