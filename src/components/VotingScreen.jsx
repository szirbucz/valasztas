import { useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { shuffleFoods } from '../data/foods'
import VoterColumn from './VoterColumn'
import Results from './Results'
import './VotingScreen.css'

export default function VotingScreen({ config, onBack }) {
  const [voters, setVoters] = useState(config.voters)
  const { foods } = config

  const handleReorder = (voterName, newRanking) => {
    setVoters(prev =>
      prev.map(v => (v.name === voterName ? { ...v, ranking: newRanking } : v)),
    )
  }

  const handleShuffle = () => {
    setVoters(prev => prev.map(v => ({ ...v, ranking: shuffleFoods(v.ranking) })))
  }

  return (
    <div className="voting-screen">
      <header className="voting-header">
        <button className="header-btn" onClick={onBack}>← Vissza</button>
        <h1>Rendezd sorba az ételeket!</h1>
        <button className="header-btn shuffle" onClick={handleShuffle}>🔀 Véletlenszerűsít</button>
      </header>

      <div className="hint-bar">
        Húzd az ételeket a preferált sorrendbe — az eredmény automatikusan frissül
      </div>

      <div className="columns-wrapper">
        <div className="columns-container">
          {voters.map(voter => (
            <VoterColumn key={voter.name} voter={voter} onReorder={handleReorder} />
          ))}
        </div>
      </div>

      <Results voters={voters} allFoods={foods} />
    </div>
  )
}
