import express from "express";
import { injectable } from "tsyringe";
import TestResource from "../resource/test.resource";
import Router from "./router";

@injectable()
export default class TestRouter implements Router {
  constructor(private readonly testResource: TestResource) {}

  get(): express.Router {
    return express.Router().get("/", this.testResource.getTest);
  }

  path(): string {
    return "/api/v1/tests";
  }
}
