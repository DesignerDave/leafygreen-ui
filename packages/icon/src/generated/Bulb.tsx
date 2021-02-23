/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 116adf920a521715826ef79704491d18
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface BulbProps extends LGGlyph.ComponentProps {}

const Bulb = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: BulbProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Bulb', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  });
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        noFlexShrink,
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      role={role}
      {...accessibleProps}
      {...props}
      viewBox="0 0 16 16"
    >
      <g id="Bulb" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <path
          d="M14.8,14.3c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.1-0.2,0.3-0.3,0.3c0,0-0.1,0-0.1,0 c-0.8,0.2-1.6,0.4-2.4,0.6c-0.2,0.1-0.4,0-0.6-0.1c-0.2-0.2-0.4-0.3-0.5-0.5l0,0L14.8,14.3z M14.6,12.1 C14.7,12.1,14.7,12.2,14.6,12.1c0.1,0.5,0.2,0.9,0.4,1.2c0,0,0,0,0,0l0,0l-5.1,1.3c0,0,0,0,0,0c-0.1-0.4-0.2-0.8-0.3-1.1l0,0 l0-0.1C11.2,13,12.9,12.6,14.6,12.1z M7.5,0.5C8.6,0,9.8-0.1,11,0.1c1.5,0.3,2.7,1,3.7,2.1c0.5,0.6,0.9,1.3,1,2.1 c0.3,1.2,0.2,2.3-0.4,3.4c-0.4,0.8-0.7,1.6-0.9,2.5c-0.1,0.3-0.1,0.6-0.1,0.9c0,0,0,0.1-0.1,0.1c-0.5,0.1-0.9,0.2-1.4,0.4 c0,0,0,0-0.1,0c-0.1-0.2-0.1-0.3-0.1-0.5c0.1-1.3,0.4-2.6,1.1-3.8c0.4-0.7,0.5-1.4,0.4-2.2c-0.2-1.1-0.7-2-1.6-2.7 c-0.8-0.6-1.8-0.9-2.9-0.8c-1,0.1-1.9,0.4-2.7,1.1C6.1,3.5,5.7,4.5,5.8,5.8C5.9,7,6.5,8.1,7.6,8.8c1.2,0.8,2.2,1.7,2.9,2.8 c0.1,0.1,0.2,0.3,0.2,0.4c-0.4,0.1-0.7,0.2-1.1,0.3c-0.1,0-0.3,0.1-0.4,0.1c-0.1,0-0.1,0-0.1,0c-0.6-0.8-1.3-1.5-2.1-2.1 c-0.3-0.2-0.6-0.4-0.8-0.6C5.5,9.2,5,8.5,4.7,7.7C3.9,6,4,4.3,5,2.6C5.6,1.7,6.4,1,7.5,0.5z M9.1,2.6c0.3-0.1,0.5,0,0.7,0.2 c0.2,0.3,0,0.6-0.3,0.7C9.1,3.7,8.7,3.9,8.4,4.2C8,4.6,7.8,5.1,7.9,5.7c0,0.1,0,0.2,0.1,0.3c0,0.2,0,0.4-0.2,0.5 C7.6,6.7,7.4,6.7,7.2,6.6C7.1,6.6,7,6.4,6.9,6.3C6.7,5.4,6.8,4.6,7.4,3.8C7.7,3.3,8.2,3,8.7,2.7c0.1,0,0.1,0,0.2-0.1 C9,2.7,9,2.7,9.1,2.6z"
          fill={'currentColor'}
          transform="translate(-2.000000, 0.000000)"
        />
      </g>
    </svg>
  );
};

Bulb.displayName = 'Bulb';
Bulb.isGlyph = true;
Bulb.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Bulb;
