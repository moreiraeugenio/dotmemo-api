import ItemModel from "../../model/item.model";

export default class ItemsResponse {
  private readonly items: ItemResponse[] = [];

  constructor(items: ItemModel[]) {
    items
      .sort((a, b) => {
        const keyComparison = a.key.localeCompare(b.key);
        return keyComparison === 0 ? a.id.localeCompare(b.id) : keyComparison;
      })
      .map((item) => this.items.push(new ItemResponse(item.id, item.key, item.value)));
  }
}

class ItemResponse {
  constructor(
    private readonly id: string,
    private readonly key: string,
    private readonly value: string,
  ) {}
}
