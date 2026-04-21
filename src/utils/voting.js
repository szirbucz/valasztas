export function calculateSingleChoice(voters, allFoods) {
  const counts = Object.fromEntries(allFoods.map(f => [f, 0]))
  for (const voter of voters) {
    if (voter.ranking.length > 0) {
      counts[voter.ranking[0]]++
    }
  }
  return allFoods
    .map(food => ({ food, votes: counts[food] }))
    .sort((a, b) => b.votes - a.votes || a.food.localeCompare(b.food))
}

function buildWinsMatrix(voters, allFoods) {
  const wins = {}
  for (const food of allFoods) {
    wins[food] = {}
    for (const other of allFoods) {
      wins[food][other] = 0
    }
  }
  for (const voter of voters) {
    const r = voter.ranking
    for (let i = 0; i < r.length; i++) {
      for (let j = i + 1; j < r.length; j++) {
        wins[r[i]][r[j]]++
      }
    }
  }
  return wins
}

export function calculateCondorcet(voters, allFoods) {
  const wins = buildWinsMatrix(voters, allFoods)
  const n = allFoods.length

  return allFoods
    .map(food => {
      let victories = 0
      const matchups = []
      for (const other of allFoods) {
        if (food === other) continue
        const myVotes = wins[food][other]
        const theirVotes = wins[other][food]
        const won = myVotes > theirVotes
        if (won) victories++
        matchups.push({ opponent: other, myVotes, theirVotes, won })
      }
      return {
        food,
        victories,
        totalOpponents: n - 1,
        isCondorcetWinner: victories === n - 1,
        matchups,
      }
    })
    .sort((a, b) => b.victories - a.victories || a.food.localeCompare(b.food))
}

export function buildPairwiseMatrix(voters, allFoods) {
  return buildWinsMatrix(voters, allFoods)
}
