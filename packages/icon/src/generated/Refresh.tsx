/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum e787aa0e3b9d4e88d7a3fac23ae0fb0a
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface RefreshProps extends LGGlyph.ComponentProps {}

const Refresh = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: RefreshProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Refresh', {
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
      <g
        id="Refresh-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M2,10.140625 L1.140625,5 L2.6015625,5.3984375 C3.5703125,3.390625 5.625,2 8,2 C10.2109375,2 12.1328125,3.1953125 13.171875,4.9765625 L11.9921875,6.1484375 C11.2890625,4.6484375 9.765625,3.6015625 8,3.6015625 C6.3671875,3.6015625 4.9375,4.5 4.1796875,5.828125 L5.859375,6.2890625 L2,10.140625 Z M13.3984375,10.609375 C12.4296875,12.6171875 10.375,14 8,14 C5.7890625,14 3.8671875,12.8046875 2.828125,11.0234375 L4.0078125,9.8515625 C4.7109375,11.3515625 6.234375,12.3984375 8,12.3984375 C9.6328125,12.3984375 11.0625,11.5 11.8203125,10.171875 L10.140625,9.7109375 L14,5.859375 L14.859375,11 L13.3984375,10.609375 Z"
          id="\uE219"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Refresh.displayName = 'Refresh';
Refresh.isGlyph = true;
Refresh.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Refresh;
