import React from "react";
import styled from "styled-components";

const Loading = ({ size = 24 }) => {
  // 🔥 Cho phép điều chỉnh kích thước mặc định là 24px
  return (
    <StyledWrapper size={size}>
      <div className="ui-Loading Loading-blk">
        <svg viewBox="22 22 44 44" className="multiColor-Loading">
          <circle
            cx={44}
            cy={44}
            r="20.2"
            fill="none"
            strokeWidth="3.6"
            className="Loading-circle Loading-circle-animation"
          />
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  .ui-Loading {
    display: inline-block;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
  .Loading-blk {
    color: #3f51b5;
    animation: rotate-outer08 1.4s linear infinite;
  }

  .multiColor-Loading {
    display: block;
    animation: color-anim08 1.4s infinite;
  }

  .Loading-circle {
    stroke: currentColor;
  }

  .Loading-circle-animation {
    animation: rotate-inner08 1.4s ease-in-out infinite;
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0;
  }

  @keyframes rotate-outer08 {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotate-inner08 {
    0% {
      stroke-dasharray: 1px, 200px;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -15px;
    }
    100% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -125px;
    }
  }

  @keyframes color-anim08 {
    0% {
      color: #4285f4;
    }
    25% {
      color: #ea4335;
    }
    50% {
      color: #f9bb2d;
    }
    75% {
      color: #34a853;
    }
  }
`;

export default Loading;
