import { useState } from 'react'
import './SetupScreen.css'

export default function SetupScreen({ onStart }) {
  const [voterCount, setVoterCount] = useState(5)
  const [optionCount, setOptionCount] = useState(4)

  return (
    <div className="setup-screen">
      <div className="setup-card">
        <div className="setup-hero">
          <div className="setup-icon">🗳️</div>
          <h1>Szavazási módszerek</h1>
          <p>Rangsorolásos vs. egyválasztásos szavazás összehasonlítása</p>
        </div>

        <div className="setup-controls">
          <div className="control-group">
            <label>
              <span className="label-text">Szavazók száma</span>
              <span className="label-hint">2 – 10 fő</span>
            </label>
            <div className="slider-row">
              <input
                type="range"
                min={2}
                max={10}
                value={voterCount}
                onChange={e => setVoterCount(Number(e.target.value))}
              />
              <span className="count-bubble">{voterCount}</span>
            </div>
          </div>

          <div className="control-group">
            <label>
              <span className="label-text">Ételek száma</span>
              <span className="label-hint">3 – 10 opció</span>
            </label>
            <div className="slider-row">
              <input
                type="range"
                min={3}
                max={10}
                value={optionCount}
                onChange={e => setOptionCount(Number(e.target.value))}
              />
              <span className="count-bubble">{optionCount}</span>
            </div>
          </div>
        </div>

        <div className="setup-info">
          <div className="info-item">
            <span className="info-icon">👆</span>
            <span>Egyválasztásos: az 1. helyre jelölt étel kap szavazatot</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🏆</span>
            <span>Condorcet: az nyer, aki mindenki mással szemben többséget szerez</span>
          </div>
        </div>

        <button
          className="start-button"
          onClick={() => onStart({ voterCount, optionCount })}
        >
          Szavazás indítása →
        </button>
      </div>
    </div>
  )
}
