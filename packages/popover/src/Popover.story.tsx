import React, { useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, text } from '@storybook/addon-knobs';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

import Popover, { Align, Justify } from '.';

const containerStyle = css`
  position: absolute;
  min-height: 50px;
  appearance: none;
  box-shadow: 0 0 4px #000;
  background-color: ${uiColors.gray.light1};
`;

const popoverStyle = css`
  border: 1px solid ${uiColors.gray.light1};
  text-align: center;
  padding: 20px;
  max-height: 100%;
  overflow: hidden;
  // Reset these properties since they'll be inherited
  // from the container element when not using a portal.
  font-size: initial;
  color: initial;
  background-color: initial;
`;

const referenceElPositions = {
  centered: css`
    position: relative;
  `,
  top: css`
    top: 0;
  `,
  right: css`
    right: 0;
  `,
  bottom: css`
    bottom: 0;
  `,
  left: css`
    left: 0;
  `,
};

const scrollableStyle = css`
  height: 200vh;
  padding-top: 50vh;
`;

function DefaultExample() {
  const [active, setActive] = useState(false);
  const exampleIsScrollable = boolean('Example page scrolling', false);

  return (
    <div className={cx({ [scrollableStyle]: exampleIsScrollable })}>
      <button
        onClick={() => setActive(!active)}
        className={cx(
          containerStyle,
          referenceElPositions[
            select(
              'Reference Element Position',
              ['centered', 'top', 'right', 'bottom', 'left'],
              'centered',
            )
          ],
        )}
      >
        {text('Button Content', 'Popover')}
        <Popover
          align={select('Align', Object.values(Align), 'top')}
          justify={select('justify', Object.values(Justify), 'start')}
          active={active}
          usePortal={boolean('usePortal', true)}
          spacing={number('spacing', 10)}
          adjustOnMutation={boolean('adjustOnMutation', false)}
        >
          <div className={popoverStyle}>Popover content</div>
        </Popover>
      </button>
    </div>
  );
}

function AdvancedExample() {
  const [active, setActive] = useState(false);
  const refEl = useRef(null);

  return (
    <>
      <button
        ref={refEl}
        onClick={() => setActive(!active)}
        className={cx(
          containerStyle,
          referenceElPositions[
            select(
              'Reference Element Position',
              ['centered', 'top', 'right', 'bottom', 'left'],
              'centered',
            )
          ],
        )}
      >
        {text('Button Content', 'Popover')}
      </button>

      <Popover
        align={select('Align', Object.values(Align), 'top')}
        justify={select('justify', Object.values(Justify), 'start')}
        active={active}
        usePortal={boolean('usePortal', true)}
        spacing={number('spacing', 10)}
        adjustOnMutation={boolean('adjustOnMutation', false)}
        refEl={refEl}
      >
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </>
  );
}

storiesOf('Popover', module)
  .add('Default', () => <DefaultExample />)
  .add('Advanced', () => <AdvancedExample />);
