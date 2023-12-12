import { ReactNode, createContext, useContext } from "react"
import { useUser } from "../user"

enum Visibility {
  Public = "public",
  Private = "private"
}
enum CardStatus {
  Reviewed = "reviewed",
  New = "new"
}
interface CardType {
  _id: string
  front: string
  back: string
  status: CardStatus
  cardImage: string
  createdAt: string
  dueDate: string
  reviewedDate: string
  efactor: number
  interval: number
  repetition: number
}
interface DeckSettings {
  reviewCards: number
  newCards: number
  visibility: Visibility
}
export interface DeckType {
  _id: string
  deckName: string
  deckImage: string
  deckImageName: string
  blurhash: string
  createdAt: string
  owner: string
  cards: any[]
  deckSettings: DeckSettings
  reviewList: string[]
}

const DeckContext = createContext<Partial<DeckType>[]>([]);

export function useDeck() {
  const decks = useContext(DeckContext)
  return decks
}


export function DeckProvider({children}: {children: ReactNode}) {
  const {user} = useUser()
  const decks = user?.decks ? user?.decks : []

  return(
    <DeckContext.Provider value={decks}>
      {children}
    </DeckContext.Provider>
  )
}

export default DeckContext