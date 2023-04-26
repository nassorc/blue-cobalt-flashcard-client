import styled from "styled-components";

const ImageIconContainer = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
`
const Image = styled.img`
    max-width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
`

export default function ImageIcon({image}) {
    return(
        <ImageIconContainer>
            {(image) 
            ? <Image src={image}/>
            : <div style={{backgroundColor: 'darkseagreen', width: '100%', height: '100%'}}></div>
            }
        </ImageIconContainer>
    );
}