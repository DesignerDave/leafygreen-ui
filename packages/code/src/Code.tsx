import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import facepaint from 'facepaint';
import debounce from 'lodash/debounce';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { variantColors } from './globalStyles';
import { Language, CodeProps, Mode } from './types';
import Syntax from './Syntax';
import WindowChrome from './WindowChrome';

export function hasMultipleLines(string: string): boolean {
  return string.trim().includes('\n');
}

// We use max-device-width to select specifically for iOS devices
const mq = facepaint([
  `@media only screen and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 2)`,
  `@media only screen and (min-device-width: 813px) and (-webkit-min-device-pixel-ratio: 2)`,
]);

const singleLineComponentHeight = 36;
const lineHeight = 24;

const codeWrapperStyle = css`
  overflow-x: auto;
  // Many applications have global styles that are adding a border and border radius to this element.
  border-radius: 0;
  border: 0;
  border-left: 2px solid;
  // We apply left / right padding in Syntax to support line highlighting
  padding-top: ${spacing[2]}px;
  padding-bottom: ${spacing[2]}px;
  margin: 0;
  position: relative;
  flex-grow: 1;

  ${mq({
    // Fixes annoying issue where font size is overridden in mobile Safari to be 20px.
    // Ideally, we wouldn't need to set the text to wrap, but from what I can tell, this is the one possible solution to the problem.
    whiteSpace: ['pre', 'pre-wrap', 'pre'],
  })}
`;

const codeWrapperStyleWithWindowChrome = css`
  border-left: 0;
`;

const copyStyle = css`
  width: 38px;
  border-left: solid 1px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-top: 6px;
`;

const singleLineCopyStyle = css`
  min-height: ${singleLineComponentHeight}px;
  padding-top: ${spacing[1]}px;
`;

const singleLineWrapperStyle = css`
  display: flex;
  align-items: center;
  padding-top: ${(singleLineComponentHeight - lineHeight) / 2}px;
  padding-bottom: ${(singleLineComponentHeight - lineHeight) / 2}px;
`;

const wrapperFocusStyle = css`
  &:focus {
    outline: none;
  }
`;

function getWrapperVariantStyle(mode: Mode): string {
  const colors = variantColors[mode];

  const borderStyle =
    mode === 'dark' ? `border: 0` : `border-color: ${colors[1]}`;

  return css`
    ${borderStyle};
    background-color: ${colors[0]};
    color: ${colors[3]};
  `;
}

function getSidebarVariantStyle(mode: Mode): string {
  const colors = variantColors[mode];

  switch (mode) {
    case Mode.Light:
      return css`
        border-color: ${colors[1]};
        background-color: white;
      `;

    case Mode.Dark:
      return css`
        border-color: ${colors[1]};
        background-color: ${colors[1]};
      `;
  }
}

function getCopyButtonStyle(mode: Mode, copied: boolean): string {
  const baseStyle = css`
    align-self: center;
    color: ${uiColors.gray.base};
  `;

  if (copied) {
    return cx(
      baseStyle,
      css`
        color: ${uiColors.white};
        background-color: ${uiColors.green.base};

        &:focus {
          color: ${uiColors.white};

          &:before {
            background-color: ${uiColors.green.base};
          }
        }

        &:hover {
          color: ${uiColors.white};

          &:before {
            background-color: ${uiColors.green.base};
          }
        }
      `,
    );
  }

  if (mode === Mode.Dark) {
    return cx(
      baseStyle,
      css`
        background-color: ${uiColors.gray.dark3};
      `,
    );
  }

  return baseStyle;
}

const ScrollState = {
  None: 'none',
  Left: 'left',
  Right: 'right',
  Both: 'both',
} as const;

type ScrollState = typeof ScrollState[keyof typeof ScrollState];

function getScrollShadowStyle(scrollState: ScrollState, mode: Mode): string {
  const colors = variantColors[mode];
  const shadowColor =
    mode === Mode.Light ? 'rgba(93,108,116,0.3)' : 'rgba(0,0,0,0.35)';

  if (scrollState === ScrollState.Both) {
    return css`
      box-shadow: inset 6px 0 6px -6px ${shadowColor},
        inset -6px 0 6px -6px ${shadowColor}, inset 0 6px 6px -6px ${colors[0]},
        inset 0 -6px 6px -6px ${colors[0]};
    `;
  }

  if (scrollState === ScrollState.Left) {
    return css`
      box-shadow: inset 6px 0 6px -6px ${shadowColor};
    `;
  }

  if (scrollState === ScrollState.Right) {
    return css`
      box-shadow: inset -6px 0 6px -6px ${shadowColor};
    `;
  }

  return '';
}

type DetailedElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

/**
 * # Code
 *
 * React Component that outputs single-line and multi-line code blocks.
 *
 * ```
<Code>Hello world!</Code>
  ```
 * ---
 * @param props.children The string to be formatted.
 * @param props.className An additional CSS class added to the root element of Code.
 * @param props.language The language used for syntax highlighing.
 * @param props.darkMode Determines if the code block will be rendered in dark mode. Default: `false`
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 * @param props.copyable When true, allows the code block to be copied to the user's clipboard. Default: `true`
 * @param props.onCopy Callback fired when Code is copied
 */
function Code({
  children = '',
  className,
  language,
  darkMode = false,
  showLineNumbers = false,
  showWindowChrome = false,
  chromeTitle = '',
  copyable = true,
  onCopy,
  highlightLines = [],
  ...rest
}: CodeProps) {
  const scrollableElementRef = useRef<HTMLPreElement>(null);
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const [buttonNode, setButtonNode] = useState<HTMLButtonElement | null>(null);
  const [scrollState, setScrollState] = useState<ScrollState>(ScrollState.None);
  const [copied, setCopied] = useState(false);
  const [showCopyBar, setShowCopyBar] = useState(false);
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const isMultiline = useMemo(() => hasMultipleLines(children), [children]);

  useEffect(() => {
    setShowCopyBar(!showWindowChrome && copyable && ClipboardJS.isSupported());
  }, [copyable, showWindowChrome]);

  useEffect(() => {
    if (!buttonNode) {
      return;
    }

    const clipboard = new ClipboardJS(buttonNode, {
      text: () => children,
    });

    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [buttonNode, children, copied]);

  useIsomorphicLayoutEffect(() => {
    const scrollableElement = scrollableElementRef.current;

    if (
      scrollableElement != null &&
      scrollableElement.scrollWidth > scrollableElement.clientWidth
    ) {
      setScrollState(ScrollState.Right);
    }
  }, []);

  const wrapperClassName = cx(
    codeWrapperStyle,
    getWrapperVariantStyle(mode),
    {
      [codeWrapperStyleWithWindowChrome]: showWindowChrome,
    },
    className,
    getScrollShadowStyle(scrollState, mode),
    { [singleLineWrapperStyle]: !isMultiline },
    { [wrapperFocusStyle]: !showFocus },
  );

  const renderedSyntaxComponent = (
    <Syntax
      showLineNumbers={showLineNumbers}
      darkMode={darkMode}
      language={language}
      highlightLines={highlightLines}
    >
      {children}
    </Syntax>
  );

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();

    if (onCopy) {
      onCopy();
    }

    setCopied(true);
  }

  function handleScroll(e: React.UIEvent) {
    const { scrollWidth, clientWidth: elementWidth } = e.target as HTMLElement;
    const isScrollable = scrollWidth > elementWidth;

    if (isScrollable) {
      const scrollPosition = (e.target as HTMLElement).scrollLeft;
      const maxPosition = scrollWidth - elementWidth;

      if (scrollPosition > 0 && scrollPosition < maxPosition) {
        setScrollState(ScrollState.Both);
      } else if (scrollPosition > 0) {
        setScrollState(ScrollState.Left);
      } else if (scrollPosition < maxPosition) {
        setScrollState(ScrollState.Right);
      }
    }
  }

  const debounceScroll = debounce(handleScroll, 50, { leading: true });

  const onScroll: React.UIEventHandler<HTMLDivElement | HTMLPreElement> = e => {
    e.persist();
    debounceScroll(e);
  };

  const borderStyle = darkMode
    ? `border: 0`
    : `border: 1px solid ${variantColors[mode][1]}`;

  const wrapperStyle = css`
    ${borderStyle};
    border-radius: 4px;
    overflow: hidden;
  `;

  const copyBar = showCopyBar && (
    <div
      className={cx(
        copyStyle,
        { [singleLineCopyStyle]: !isMultiline },
        getSidebarVariantStyle(mode),
      )}
    >
      <IconButton
        ref={setButtonNode}
        darkMode={darkMode}
        aria-label="Copy"
        className={getCopyButtonStyle(mode, copied)}
        onClick={handleClick}
      >
        {copied ? <CheckmarkIcon /> : <CopyIcon />}
      </IconButton>
    </div>
  );

  return (
    <div className={wrapperStyle}>
      {showWindowChrome && (
        <WindowChrome chromeTitle={chromeTitle} darkMode={darkMode} />
      )}

      <div
        className={css`
          display: flex;
        `}
      >
        <pre
          {...(rest as DetailedElementProps<HTMLPreElement>)}
          className={wrapperClassName}
          onScroll={onScroll}
          ref={scrollableElementRef}
          // Adds to Tab order when content is scrollable, otherwise overflowing content is inaccessible via keyboard navigation
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={scrollState !== ScrollState.None ? 0 : -1}
        >
          {renderedSyntaxComponent}
        </pre>

        {copyBar}
      </div>
    </div>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.string.isRequired,
  language: PropTypes.oneOf(Object.values(Language)),
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showWindowChrome: PropTypes.bool,
  chromeTitle: PropTypes.string,
  highlightLines: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
    ]),
  ),
};

export default Code;
