import { config } from "dotenv";
import "jest";
import logic from ".";
const pepe: any = require("../data/clients.json");

jest.setTimeout(10000);

describe("logic", () => {

  describe("list clients", () => {
    test("should list correctly", () => {
      return logic.listClients()
        .then((clients: any[]) => {
          expect(clients.length).toBeGreaterThan(0);

          const client = clients[0];

          expect(client).toHaveProperty("id");
          expect(client.id).toBeInstanceOf("string");

          expect(client).toHaveProperty("name");
          expect(client.name).toBeInstanceOf("string");

          expect(client).toHaveProperty("email");
          expect(client.email).toBeInstanceOf("string");

          expect(client).toHaveProperty("role");
          expect(client.role).toBeInstanceOf("string");
        });
    });
  });

  describe("list policies", () => {
    test("should list correctly", () => {
      return logic.listPolicies()
        .then((policies: any[]) => {
          expect(policies.length).toBeGreaterThan(0);

          const client = policies[0];

          expect(client).toHaveProperty("id");
          expect(client.id).toBeInstanceOf("string");

          expect(client).toHaveProperty("amountInsured");
          expect(client.name).toBeInstanceOf("number");

          expect(client).toHaveProperty("inceptionDate");
          expect(client.email).toBeInstanceOf("string");

          expect(client).toHaveProperty("installmentPayment");
          expect(client.role).toBeInstanceOf("boolean");
          
          expect(client).toHaveProperty("clientId");
          expect(client.role).toBeInstanceOf("string");
        });
    });
  });

  describe("authenticate", () => {
    const email: string = "pepe@test.com";

    test("should authenticate correctly", () => {
      // return Promise.resolve()
      //   .then(() => logic._isFollowingUser(user, privateUser))
      //   .then((res: boolean) => expect(res).toBeFalsy());
      // logic.authenticate(email)
    });

  });

});
