# @infinitex/autocomplete

@infinitex/autocomplete is a Simple React Component library, with a small size.

## Installation

Use the package manager yarn/npm to install @infinitex/autocomplete.

```bash
yarn add @infinitex/autocomplete
# npm i @infinitex/autocomplete
```

## Props

```ts
type Props = {
  // it's a controlled input component
  value: string;
  // use this callback to update value
  onChange(input: string): void;
  // when click item or press "Enter", this callback will be triggered
  onSelect(option: string): void;
  // a list of dropdown items
  options: string[];
  // custom function to render dropdown item
  optionRenderer?(option: string, active: boolean): JSX.Element;
  // custom function to match option to value
  optionKeyExtractor?(option: string): string;
  // show a red message on bottom-right, when it's a valid string
  error?: string;
  // show a spinner at center of dropdown
  isLoading?: boolean;
  // input placeholder
  placeholder?: string;
  styles?: {
    input: CSSProperties;
    dropdown: CSSProperties;
  };
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
