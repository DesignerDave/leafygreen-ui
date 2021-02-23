# @leafygreen-ui/text-area

## 3.0.3

### Patch Changes

- d6829357: Removes outline from focus state, in favor of allowing our InteractionRing component to handle displaying focus.
  - @leafygreen-ui/typography@7.3.1

## 3.0.2

### Patch Changes

- 358a072e: Fixes visual regression where the border of inputs do not appear until text is entered
- Updated dependencies [fc18e572]
  - @leafygreen-ui/typography@7.3.0

## 3.0.1

### Patch Changes

- ee766843: Fixes bug where aria-labelledby prop was not appropriately applied to textarea element

## 3.0.0

### Major Changes

- 8b0ea602: Form-compatible components now display more visually consistent hover and focus states

### Patch Changes

- Updated dependencies [8b0ea602]
- Updated dependencies [8b0ea602]
  - @leafygreen-ui/interaction-ring@1.0.0
  - @leafygreen-ui/typography@7.2.0

## 2.0.0

### Major Changes

- 69354cdd: className prop is now spread on container `div` rather than `textarea` element

### Minor Changes

- 627333c2: `State` is now a named export from the package

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 1.0.1

### Patch Changes

- 374430ea: Updates string color value to reference the same color from uiColors palette
- 9ee1d5fc: Updates `@leafygreen-ui/lib` dependency to the most recent major version
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1

## 1.0.0

### Major Changes

- 4ee17735: Initial release of TextArea component
