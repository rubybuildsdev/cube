/**
 * RubiksCube3D - 3D Rubik's Cube Component & Controller
 * Exports both the React component RubiksCube3D (alias to CubeCanvas)
 * and the underlying Three.js RubiksCubeModel class.
 */

import React, { forwardRef } from 'react';
import CubeCanvas from './CubeCanvas.jsx';
import { RubiksCubeModel } from './RubiksCubeModel.js';

export { RubiksCubeModel };

export const RubiksCube3D = forwardRef(function RubiksCube3D(props, ref) {
  return <CubeCanvas ref={ref} {...props} />;
});

export default RubiksCube3D;
