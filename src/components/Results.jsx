import { calculateSingleChoice, calculateCondorcet, buildPairwiseMatrix } from '../utils/voting'
import './Results.css'

function Medal({ rank }) {
  if (rank === 1) return <span className="medal gold">🥇</span>
  if (rank === 2) return <span className="medal silver">🥈</span>
  if (rank === 3) return <span className="medal bronze">🥉</span>
  return <span className="medal plain">{rank}.</span>
}

function ResultRow({ rank, food, score, isWinner }) {
  return (
    <div className={`result-row${isWinner ? ' winner' : ''}`}>
      <Medal rank={rank} />
      <span className="result-food">{food}</span>
      <span className="result-score">{score}</span>
    </div>
  )
}

function PairwiseMatrix({ voters, allFoods }) {
  const matrix = buildPairwiseMatrix(voters, allFoods)
  const total = voters.length

  return (
    <div className="matrix-section">
      <h3>Páros összehasonlítás mátrixa</h3>
      <p className="matrix-desc">
        Egy cella azt mutatja, hány szavazó preferálja a <strong>sort</strong> az oszloppal szemben.
        Zöld = többség, piros = kisebbség.
      </p>
      <div className="matrix-scroll">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="matrix-corner"></th>
              {allFoods.map((food, i) => (
                <th key={food} title={food}>
                  <span className="col-index">{i + 1}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFoods.map((row, rowIdx) => (
              <tr key={row}>
                <td className="matrix-row-label" title={row}>
                  <span className="row-index">{rowIdx + 1}</span>
                  <span className="row-name">{row}</span>
                </td>
                {allFoods.map(col => {
                  if (row === col) {
                    return <td key={col} className="matrix-diag">—</td>
                  }
                  const myVotes = matrix[row][col]
                  const won = myVotes * 2 > total
                  const tied = myVotes * 2 === total
                  return (
                    <td
                      key={col}
                      className={`matrix-cell ${won ? 'cell-win' : tied ? 'cell-tie' : 'cell-loss'}`}
                      title={`${row} vs ${col}: ${myVotes}–${matrix[col][row]}`}
                    >
                      {myVotes}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="matrix-legend">
          {allFoods.map((food, i) => (
            <span key={food} className="legend-item">
              <strong>{i + 1}.</strong> {food}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Results({ voters, allFoods }) {
  const singleChoice = calculateSingleChoice(voters, allFoods)
  const condorcet = calculateCondorcet(voters, allFoods)

  const singleWinner = singleChoice[0]?.food
  const condorcetTop = condorcet[0]
  const condorcetWinner = condorcetTop?.isCondorcetWinner ? condorcetTop.food : null
  const winnersMatch = singleWinner === condorcetTop?.food

  return (
    <div className="results-section">
      <div className={`comparison-banner${winnersMatch ? ' match' : ' mismatch'}`}>
        {winnersMatch ? (
          <>✅ Mindkét módszerrel <strong>{singleWinner}</strong> nyert</>
        ) : (
          <>
            ⚠️ Különböző győztes!&nbsp;
            Egyválasztásos: <strong>{singleWinner}</strong>&nbsp;·&nbsp;
            Condorcet: <strong>{condorcetTop?.food}</strong>
          </>
        )}
      </div>

      <div className="results-grid">
        <div className="result-panel">
          <div className="panel-header panel-single">
            <h2>🗳️ Egyválasztásos szavazás</h2>
            <p>Mindenki az 1. helyre tett ételre szavaz</p>
          </div>
          <div className="result-list">
            {singleChoice.map((item, idx) => (
              <ResultRow
                key={item.food}
                rank={idx + 1}
                food={item.food}
                score={`${item.votes} szavazat`}
                isWinner={idx === 0}
              />
            ))}
          </div>
        </div>

        <div className="result-panel">
          <div className="panel-header panel-condorcet">
            <h2>🏆 Condorcet módszer</h2>
            <p>Az nyeri, aki páros összevetésben mindenkit ver</p>
          </div>
          <div className="result-list">
            {condorcet.map((item, idx) => (
              <ResultRow
                key={item.food}
                rank={idx + 1}
                food={item.food}
                score={`${item.victories}/${item.totalOpponents} győzelem`}
                isWinner={item.isCondorcetWinner}
              />
            ))}
            {!condorcetWinner && (
              <div className="paradox-note">
                ⚠️ Condorcet-paradoxon: nincs egyértelmű győztes
              </div>
            )}
          </div>
        </div>
      </div>

      <PairwiseMatrix voters={voters} allFoods={allFoods} />
    </div>
  )
}
