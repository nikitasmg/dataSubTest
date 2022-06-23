import {PayForm} from "./PayForm";
import styled from "@emotion/styled";

export const PayWrapper = () => {

    const Wrapper = styled('div')`
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(to right top, #dedede, #b3e2ff, #00f1ff, #00f7b1, #a8eb12);
      animation: gradient 5s ease infinite;
      background-size: 150% 150%;

      @keyframes gradient {
        0% {
          background-position: 0 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }
    `
    return (
        <Wrapper>
            <PayForm/>
        </Wrapper>
    );
};