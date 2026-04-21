import { useState } from 'react'
import SetupScreen from './components/SetupScreen'
import VotingScreen from './components/VotingScreen'
import { getRandomNames } from './data/names'
import { getRandomFoods, shuffleFoods } from './data/foods'

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [config, setConfig] = useState(null)

  const handleStart = ({ voterCount, optionCount }) => {
    const names = getRandomNames(voterCount)
    const foods = getRandomFoods(optionCount)
    const voters = names.map(name => ({
      name,
      ranking: shuffleFoods(foods),
    }))
    setConfig({ voters, foods })
    setScreen('voting')
  }

  const handleBack = () => {
    setScreen('setup')
    setConfig(null)
  }

  return screen === 'setup'
    ? <SetupScreen onStart={handleStart} />
    : <VotingScreen config={config} onBack={handleBack} />
}
