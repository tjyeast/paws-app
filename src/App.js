import React, {Component} from 'react';
import styled, { keyframes } from 'styled-components';
import { pulse } from 'react-animations';

const pulseAnimation = keyframes`${pulse}`;

const PulsingDiv = styled.div`
  animation: ${pulseAnimation} 2s infinite;
  width: 25px;
  height: 25px;
  background-color: black;
`;

class App extends Component {
  render() {
    return (
      <div>
        <PulsingDiv />
      </div>
    )
  }
}
export default App;
