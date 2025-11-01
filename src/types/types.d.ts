import * as express from "express";

declare global {
  namespace Express {
    interface User {
        _id: string
        username: string
        role: 'admin' | 'user'
    }
  }
}
