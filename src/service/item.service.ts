import { injectable } from "tsyringe";
import ItemModel from "../model/item.model";
import ItemRepository from "../repository/item.repository";

@injectable()
export default class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAllByUserEmail(userEmail: string): Promise<ItemModel[]> {
    return await this.itemRepository.findAllByUserEmail(userEmail);
  }

  async createForUserEmail(key: string, value: string, userEmail: string): Promise<ItemModel[]> {
    const item = ItemModel.withKeyAndValue(key, value, userEmail);
    await this.itemRepository.create(item);
    const items = await this.itemRepository.findAllByUserEmail(userEmail);
    return items;
  }
}
