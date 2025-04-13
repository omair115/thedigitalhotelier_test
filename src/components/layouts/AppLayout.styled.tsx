import { theme } from "twin.macro";
import styled from 'styled-components'

export const PageLayoutWrapper = styled.div`
  min-height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
  
  /* Optional: if you want to contain child margins */
  display: flow-root;
  
  @media screen and (max-width: 640px) {
    overflow-x: hidden;
  }
`;

export const ChildrenWrapper = styled.div`
margin-top: 0px;
`
