import styled from "styled-components";

const ImageIconContainer = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
`
const Image = styled.img`
    width: 100%
`

export default function ImageIcon({image}) {
    return(
        <ImageIconContainer>
            <Image src={image}/>
        </ImageIconContainer>
    );
}