import {ReactNode, useState} from 'react'

export default function FlashcardDeckShell({children, onClick}: {children: ReactNode, onClick?: () => void}) {
  const [deckHover, setDeckHover] = useState(false)
  return (
    <div 
      className="group relative overflow-hidden border border-black/30 rounded-lg transition-shadow"
      onMouseEnter={() => setDeckHover(true)}
      onMouseLeave={() => setDeckHover(false)}
      style={{
        boxShadow: deckHover ? "0px 4px 0px 4px rgba(0, 0, 0, 0.2)" : ""
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
