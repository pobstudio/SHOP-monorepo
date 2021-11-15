import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ZoraFragment } from './fragment';
import { useBlockchainStore } from '../../../stores/blockchain';

export const ZoraShaderCanvas = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blockNumber = useBlockchainStore((s) => s.blockNumber);
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      if (typeof window !== 'undefined') {
        const GlslCanvas = require('glslCanvas').default;
        const sandbox = new GlslCanvas(canvasRef.current);
        sandbox.load(ZoraFragment);
        sandbox.setUniform('u_seed', Math.pow(blockNumber ?? 21021021, 0.5));
        canvasRef.current.style.display = 'block';
      }
    }
  }, [canvasRef, blockNumber]);
  return <ResetCanvas id="glslCanvas" ref={canvasRef} />;
});

const Canvas = styled.canvas`
  backface-visibility: hidden;
  perspective: 1000;
  width: 100%;
`;

const StretchCanvas = styled(Canvas)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
`;

const ResetCanvas = styled(StretchCanvas)`
  display: none;
`;
