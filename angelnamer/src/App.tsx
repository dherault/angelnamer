import { HTMLAttributes, useCallback, useState } from 'react'

type NameType = {
  name: string
  category: number
}

function Button(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="bg-white text-lg px-3 py-2 rounded-full text-cyan-300 hover:bg-cyan-50 active:bg-cyan-100 select-none outline-none"
      {...props}
    />
  )
}

function ButtonCyan(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="bg-cyan-300 text-lg px-3 py-2 rounded-full text-white hover:bg-cyan-400 active:bg-cyan-500 select-none outline-none"
      {...props}
    />
  )
}

function App() {
  const [name, setName] = useState('?')
  const [category, setCategory] = useState(1)
  const [names, setNames] = useState<NameType[]>([])
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addedName, setAddedName] = useState('')
  const [addedCategory, setAddedCategory] = useState(1)

  const handleName = useCallback(() => {
    const filteredNames = names.filter(x => x.category === category)

    if (filteredNames.length === 0) return
    if (filteredNames.length === 1) return setName(filteredNames[0].name)

    setName(x => {
      let randomName

      do randomName = filteredNames[Math.floor(Math.random() * filteredNames.length)]
      while (x === randomName.name)

      return randomName.name
    })
  }, [names, category])

  const handleSelectName = useCallback(() => {
    const intervalId = setInterval(handleName, 100)

    setTimeout(() => {
      clearInterval(intervalId)
    }, 1000)
  }, [handleName])

  const handleAddName = useCallback(() => {
    setNames(x => [...x, { name: addedName, category: addedCategory }])
    setAddedName('')
  }, [addedName, addedCategory])

  return (
    <div className="px-2 py-4 bg-white h-screen">
      <h1 className="font-extrabold text-3xl text-cyan-300 text-center">Angel Namer</h1>
      <div className="flex items-center justify-center font-extrabold text-5xl my-16 text-cyan-300">
        {name}
      </div>
      <div className="flex items-center justify-between gap-2 mt-2">
        <ButtonCyan
          style={{ flexGrow: 1, outline: category === 1 ? '2px solid cyan' : '' }}
          onClick={() => setCategory(1)}
        >
          1
        </ButtonCyan>
        <ButtonCyan
          style={{ flexGrow: 1, outline: category === 2 ? '2px solid cyan' : '' }}
          onClick={() => setCategory(2)}
        >
          2
        </ButtonCyan>
        <ButtonCyan
          style={{ flexGrow: 1, outline: category === 3 ? '2px solid cyan' : '' }}
          onClick={() => setCategory(3)}
        >
          3
        </ButtonCyan>
        <ButtonCyan
          style={{ flexGrow: 1, outline: category === 4 ? '2px solid cyan' : '' }}
          onClick={() => setCategory(4)}
        >
          4
        </ButtonCyan>
      </div>
      <div className="mt-8">
        <ButtonCyan
          style={{ width: '100%' }}
          onClick={handleSelectName}
        >
          Read name
        </ButtonCyan>
      </div>
      <div className="mt-4">
        <ButtonCyan
          style={{ width: '100%' }}
          onClick={() => setAddModalOpen(true)}
        >
          Write name
        </ButtonCyan>
      </div>
      <div
        style={{ top: addModalOpen ? 0 : '100%' }}
        className="absolute inset-0 h-full bg-cyan-300 transition-all duration-300 px-2 py-4"
      >
        <h1 className="font-extrabold text-3xl text-white text-center">
          Add name
        </h1>
        <input
          type="text"
          className="w-full bg-white px-3 py-2 rounded-full text-cyan-300 text-lg outline-none placeholder:text-cyan-200 mt-8"
          placeholder="Name"
          value={addedName}
          onChange={e => setAddedName(e.target.value)}
        />
        <div className="text-white font-extrabold text-lg text-center mt-4">
          Category:
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <Button
            style={{ flexGrow: 1, outline: addedCategory === 1 ? '2px solid cyan' : '' }}
            onClick={() => setAddedCategory(1)}
          >
            1
          </Button>
          <Button
            style={{ flexGrow: 1, outline: addedCategory === 2 ? '2px solid cyan' : '' }}
            onClick={() => setAddedCategory(2)}
          >
            2
          </Button>
          <Button
            style={{ flexGrow: 1, outline: addedCategory === 3 ? '2px solid cyan' : '' }}
            onClick={() => setAddedCategory(3)}
          >
            3
          </Button>
          <Button
            style={{ flexGrow: 1, outline: addedCategory === 4 ? '2px solid cyan' : '' }}
            onClick={() => setAddedCategory(4)}
          >
            4
          </Button>
        </div>
        <div className="mt-8">
          <Button
            style={{ width: '100%' }}
            onClick={() => handleAddName()}
          >
            Create
          </Button>
        </div>
        <div className="mt-4">
          <Button
            style={{ width: '100%' }}
            onClick={() => setAddModalOpen(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
