import { useState, useEffect } from 'react'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { DndContext, DragStartEvent, DragEndEvent } from '@dnd-kit/core'

import { sizePreset, SizeKeys, CardData } from '@/types/card.types'
import { gridSizeType } from '@/types/grid.types'
import { LabelData } from '@/types/label.types'
import { useContextMenu } from '@/contexts/ContextMenuProvider'
import { useStyles } from '@/contexts/StylesProvider'
import Card from './card'
import GridMenu from './GridMenu'
import Label from './label'

export default function Grid({
  gridTitle,
  userId,
}: {
  gridTitle: string
  userId: string
}) {
  const { clicked, setClicked, points, setPoints } = useContextMenu()
  const { gridSpacing, setGridSpacing } = useStyles()
  const [activeId, setActiveId] = useState<string>()
  const [data, setData] = useState<Array<CardData>>([])
  const [labelData, setLabelData] = useState<Array<LabelData>>([])

  /** Adds background gridlines */
  const gridBackgroundStyle = {
    backgroundImage: `
    repeating-linear-gradient(
      to right,
      #505050,
      #505050 1px,
      transparent 1px,
      transparent ${Number(gridSpacing) * 100}px
    ),
    repeating-linear-gradient(
      to bottom,
      #505050,
      #505050 1px,
      transparent 1px,
      transparent ${Number(gridSpacing) * 100}px
    )
  `,
  }

  useEffect(() => {
    /** loads initial data */
    async function getCardData() {
      try {
        await fetch('/api/cards')
          .then((res) => {
            return res.json()
          })
          .then((json) => {
            /** Save to local app state */
            const jsonArray = []
            for (const card of json) {
              jsonArray.push(card)
            }
            console.log(json)
            setData(jsonArray)
          })
      } catch (err) {
        console.log(err)
      }
    }
    getCardData()
  }, [])

  function deleteCard(taskId: string) {
    setData(
      data.filter((item) => {
        if (item._id) {
          return taskId !== item._id
        } else {
          // TODO: getid
        }
      })
    )
  }

  /** adds a new card */
  async function sendCardData(taskData: CardData) {
    // fetch function
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
      // update local app state
      const json = await res.json()
      taskData._id = json._id
      setData([taskData, ...data])
    } catch (err) {
      console.error(err)
    }
  }

  /** Opens context menu */
  function handleOpenGridMenu(evt: React.MouseEvent) {
    evt.preventDefault()
    if ((evt.target as HTMLElement).id == 'grid') {
      setClicked('grid')
      setPoints({
        x: evt.pageX,
        y: evt.pageY,
      })
    }
  }

  /** Sets activeId so that active card is visually moved to the top */
  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActiveId(String(active.id))
  }

  /** Updates position data for card when being dragged */
  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event
    if (String(active.id)?.endsWith('-label')) {
      setLabelData(
        labelData.map((label: LabelData) =>
          label._id + '-label' === active.id
            ? {
                ...label,
                position: {
                  x: label.position.x + delta.x,
                  y: label.position.y + delta.y,
                },
              }
            : label
        )
      )
    } else {
      setData(
        data.map((card: CardData) =>
          card.label === active.id
            ? {
                ...card,
                position: {
                  x: card.position.x + delta.x,
                  y: card.position.y + delta.y,
                },
              }
            : card
        )
      )
    }
  }

  function handleAddNewLabel(data: LabelData) {
    setLabelData([...labelData, data])
  }

  function deleteLabel(labelId: string) {
    setLabelData(
      labelData.filter((item) => {
        if (item._id) {
          return labelId !== item._id
        } else {
          // TODO: getid
        }
      })
    )
  }

  /** updates existing label data*/
  async function updateLabelData(data: LabelData) {
    const element = labelData.find((e) => e._id === data._id)
    if (element) {
      element.label += data.label
    } else {
      labelData.push(data)
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}>
      <div
        className={styles.grid}
        style={gridSpacing === 'none' ? {} : gridBackgroundStyle}
        onContextMenu={(evt) => handleOpenGridMenu(evt)}>
        <div id="grid" className={styles.draggable}>
          {data.map((card) => (
            <Card
              key={card.label}
              label={card.label}
              color={card.color}
              position={card.position}
              activeId={activeId ?? ''}
              setActiveId={setActiveId}
              size={sizePreset[card.size as SizeKeys]}
              cardId={card._id ?? card.label}
              rotation={card.rotated}
              deleteCard={deleteCard}
            />
          ))}
          {labelData.map((label) => (
            <Label
              key={label._id + '-label'}
              label={label.label}
              position={label.position}
              _id={label._id ?? 'label'}
              deleteLabel={deleteLabel}
              sendLabel={updateLabelData}
            />
          ))}
        </div>
      </div>
      {clicked === 'grid' ? (
        <GridMenu
          top={points.y}
          left={points.x}
          gridSpacing={gridSpacing as gridSizeType}
          setGridSpacing={setGridSpacing}
          addNewCard={sendCardData}
          cardCount={data.length}
          setClicked={setClicked}
          addNewLabel={handleAddNewLabel}
          labelCount={labelData.length}
          userId={userId}
          gridName={gridTitle}></GridMenu>
      ) : (
        ''
      )}
    </DndContext>
  )
}

const styles = {
  grid: 'relative flex flex-1 border-2 rounded-md',
  draggable: 'relative flex flex-1 rounded-md p-2',
}
