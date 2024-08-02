import express from "express";
import { injectable } from "tsyringe";
import ItemResource from "../resource/item.resource";
import Router from "./router";

@injectable()
export default class ItemRouter implements Router {
  constructor(private readonly itemResource: ItemResource) {}

  get(): express.Router {
    return express.Router().get("/", this.itemResource.findAll).post("/", this.itemResource.create);
  }

  path(): string {
    return "/api/v1/items";
  }
}
