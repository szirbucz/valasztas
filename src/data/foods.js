const FOODS = [
  'Gulyásleves', 'Pörkölt', 'Halászlé', 'Töltött káposzta',
  'Lángos', 'Kürtőskalács', 'Lecsó', 'Paprikás csirke',
  'Rántott hús', 'Túrós csusza', 'Somlói galuska', 'Dobos torta',
  'Rétes', 'Gombóc', 'Rakott krumpli', 'Húsleves',
  'Kolbász', 'Hurka', 'Csülök', 'Libamáj',
]

export function getRandomFoods(count) {
  return [...FOODS].sort(() => Math.random() - 0.5).slice(0, count)
}

export function shuffleFoods(foods) {
  return [...foods].sort(() => Math.random() - 0.5)
}
