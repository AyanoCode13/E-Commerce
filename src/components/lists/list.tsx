import { $, component$, type QRL } from "@builder.io/qwik";

export interface ListProps<T> {
  items: T[];
  renderItem: QRL<(item: T, index: number) => any>;
  keyFn?: QRL<(item: T, index: number) => Promise<string | number>>;
  cls?: string;
  itemCls?: string;
}

export const List = component$(
  <T,>({
    items,
    renderItem,
    keyFn = $(async (item: T, index: number) => String(index)),
    cls= "",
    itemCls=""
  }: ListProps<T>) => {
    return (
      <ul class={`${cls}`}>
        {items.map(async (item, index) => (
          <li key={await keyFn(item, index)} class={itemCls}>{renderItem(item, index)}</li>
        ))}
      </ul>
    );
  },
);
