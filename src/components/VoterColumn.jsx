import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './VoterColumn.css'

const RANK_STYLES = [
  { background: '#f59e0b', color: '#1e293b' },
  { background: '#94a3b8', color: 'white' },
  { background: '#b45309', color: 'white' },
]

function getRankStyle(rank) {
  return RANK_STYLES[rank - 1] ?? { background: '#e2e8f0', color: '#64748b' }
}

function SortableFood({ id, rank }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`food-item${isDragging ? ' dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <span className="rank-badge" style={getRankStyle(rank)}>
        {rank}
      </span>
      <span className="food-name">{id}</span>
      <span className="drag-handle" aria-hidden>⠿</span>
    </div>
  )
}

export default function VoterColumn({ voter, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIndex = voter.ranking.indexOf(active.id)
      const newIndex = voter.ranking.indexOf(over.id)
      onReorder(voter.name, arrayMove(voter.ranking, oldIndex, newIndex))
    }
  }

  return (
    <div className="voter-column">
      <div className="voter-header">
        <div className="voter-avatar">{voter.name[0]}</div>
        <div className="voter-name">{voter.name}</div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={voter.ranking} strategy={verticalListSortingStrategy}>
          <div className="food-list">
            {voter.ranking.map((food, index) => (
              <SortableFood key={food} id={food} rank={index + 1} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
