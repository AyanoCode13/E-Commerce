import { component$ } from '@builder.io/qwik';

export interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => any;
  keyFn?: (item: T, index: number) => string | number;
  className?: string;
}

export const List = component$(<T,>({
  items, 
  renderItem, 
  keyFn = (item: T, index: number) => String(index),
  className = ''
}: ListProps<T>) => {
  return (
    <ul class={`list ${className}`}>
      {items.map((item, index) => (
        <li key={keyFn(item, index)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
});