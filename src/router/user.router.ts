import express from "express";
import { injectable } from "tsyringe";
import UserResource from "../resource/user.resource";
import Router from "./router";

@injectable()
export default class UserRouter implements Router {
  constructor(private readonly userResource: UserResource) {}

  get(): express.Router {
    return express.Router().post("/register", this.userResource.register.bind(this.userResource));
  }

  path(): string {
    return "/api/v1/users";
  }
}
