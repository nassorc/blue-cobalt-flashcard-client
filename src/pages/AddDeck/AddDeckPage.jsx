import { PageContainer } from "../../common/components/styled/Container.styled"
import useEditableDeck from "../../common/hooks/useEditableDeck"

export default function AddDeckPage() {
    const [deck, setDeck] = useEditableDeck();

    return(
        <PageContainer>
            <h1>test</h1>
        </PageContainer>
    )
}