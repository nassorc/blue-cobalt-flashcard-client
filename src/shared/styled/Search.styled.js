import styled from 'styled-components';
export const SearchBox = styled.div`
	margin: 1rem 0;
	float: right;
	position: relative;
`
export const SearchInput = styled.input`
	position: relative;
	padding: 12px 40px 12px 16px;
	border: none;
	background-color: rgba(0,0,0,0.14);
	border-radius: 6px;
`
export const SearchButton = styled.button`
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	background-color: transparent;
	color: rgba(0,0,0,0.5);
	cursor: pointer;
	border: none;
`