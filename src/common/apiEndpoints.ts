import { Method } from "axios";

type Endpoint = {
  url: string;
  method: Method;
};

export const endpoints = {
  auth: {
    login: <Endpoint>{ url: "/user/login", method: "POST" },
    register: <Endpoint>{ url: "/user/register", method: "POST" },
  },
  notes: {
    get: <Endpoint>{ url: "/notes/", method: "GET" },
    create: <Endpoint>{ url: "/notes/", method: "POST" },
    update: (id: string) => <Endpoint>{ url: `/notes/${id}`, method: "PUT" },
    delete: (id: string) => <Endpoint>{ url: `/notes/${id}`, method: "POST" },
  },
};
