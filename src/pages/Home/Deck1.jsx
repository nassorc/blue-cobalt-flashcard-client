import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Blurhash } from 'react-blurhash';
import { faLayerGroup, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { ButtonSm } from '../../common/components/styled/Button.styled';
import { Badge } from '../../common/components/styled/Badge.styled';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styles from '../../common/assets/styles.module.css';
const DeckImageContainer = styled.div`
	margin: 0;
	padding: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	// top: 0;
	// bottom: 0;
	// left:0;
	// right: 0;
	z-index: 1;
`
const DeckImage = styled.img`
	display: block;
	width: 100%;
	max-width: 100%;
	height: 100%;
	object-fit: contain;
`
const DeckContent = styled.div`
	padding: 0.8rem 1rem;
	background-color: white;
	position: relative;
	z-index: 10;

	& > *:not(:last-child) {
		margin-bottom: 0.8rem;
	}
`
const DeckCard1 = styled.div`
	position: relative;
	box-sizing: border-box;
	width: 300px;
	max-height: 200px;
	min-height: 200px;
    height: 200px;
	background-color: white;
	box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
	border-radius: 8px;

	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	overflow: hidden;

	transition: 400ms;

	&:hover {
		box-shadow: 0px 4px 0px 4px rgba(0, 0, 0, 0.2);
	}
` 
export default function Deck1({deck}) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const navigate = useNavigate();
    const handlePracticeClick = (e) => {
		navigate(`/practice/${deck._id}`);
	};
	const handleEditClick = (e) => {
		navigate(`/edit/${deck._id}`);
	};

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setImageLoaded(true)
		}
		img.src = deck?.deckImage
	}, [deck])
	
	return(
		<DeckCard1>
			<DeckImageContainer>
				{/* {deckImage && <DeckImage loading="lazy" src={deckImage}/>} */}
				{
					!imageLoaded && 
					<Blurhash 
						hash={deck?.blurhash}
						width={300}
						height={200}
						resolutionX={32}
						resolutionY={32}
						punch={1}
					/>
				}
				{deck?.deckImage && <LazyLoadImage style={{objectFit: 'cover'}} width={'100%'} height={'100%'} effect="blur" src={deck?.deckImage}/>}
			</DeckImageContainer>
			<DeckContent>
                    <>
						<div>
							<h3>{deck?.deckName}</h3>
						</div>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<div>
								<Badge>
									<FontAwesomeIcon icon={faLayerGroup} style={{color: 'rgba(0, 0, 0, 0.7)'}} />
									<p>{deck?.cards?.length}</p>
								</Badge>
								<Badge>
									<FontAwesomeIcon icon={faGraduationCap} style={{color: 'rgba(0, 0, 0, 0.7)'}}/>
									<p>{deck?.reviewList?.length}</p>
								</Badge>
							</div>
							<div className={styles['button-container']}>
                                <ButtonSm
                                    bg="white"
                                    color="black"
                                    borderColor="rgba(0,0,0,0.5)"
                                    onClick={handlePracticeClick}
                                >
                                    Practice
                                </ButtonSm>
                                <ButtonSm
                                    bg="white"
                                    color="black"
                                    borderColor="rgba(0,0,0,0.5)"
                                    onClick={handleEditClick}
                                >
                                    Edit
                                </ButtonSm>
                            </div>
						</div>
					</>
			</DeckContent>
		</DeckCard1>
	)
} 