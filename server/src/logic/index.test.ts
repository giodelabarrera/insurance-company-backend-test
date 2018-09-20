import "jest";
import logic from ".";
import { getRandomInt } from "../utils";

jest.setTimeout(10000);

describe("logic", () => {
  let user: any;
  let admin: any;

  beforeEach(async () => {
    const clients: any[] = await logic._listClients();
    const clientsLen: number = clients.length;
    let position: number;

    do {
      position = getRandomInt(0, clientsLen);
      user = clients[position];
    } while (user.role !== "user");

    do {
      position = getRandomInt(0, clientsLen);
      admin = clients[position];
    } while (admin.role !== "admin");
  });

  describe("list clients", () => {
    test("should list correctly", () => {
      return logic._listClients()
        .then((clients: any[]) => expect(clients.length).toBeGreaterThan(0));
    });
  });

  describe("list policies", () => {
    test("should list correctly", () => {
      return logic._listPolicies()
        .then((policies: any[]) => expect(policies.length).toBeGreaterThan(0));
    });
  });

  describe("authenticate", () => {

    test("should authenticate correctly", () => {
      return logic.authenticate(user.email)
        .then((res: boolean) => expect(res).toBeTruthy());
    });

    test("should fail on trying authenticate with undefined email", () => {
      return logic.authenticate(undefined)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe("Email is required"));
    });

    test("should fail on trying authenticate with invalid email", () => {
      const invalidEmail = "invalid-email";

      return logic.authenticate(invalidEmail)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe("Email is invalid"));
    });

    test("should fail on trying authenticate with email not existing", () => {
      const unknownEmail = "unknown@quotezart.com";

      return logic.authenticate(unknownEmail)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`Not found user with email ${unknownEmail}`));
    });
  });

  describe("retrieve user", () => {

    describe("user role", () => {
      let targetUser: any;

      beforeEach(async () => {
        const clients: any[] = await logic._listClients();
        const clientsLen: number = clients.length;
        let position: number;

        do {
          position = getRandomInt(0, clientsLen);
          targetUser = clients[position];
        } while (targetUser.id !== user.id);

        await logic.authenticate(user.email);
      });

      test("should retrieve user correctly", () => {
        return logic.retrieveUser(user.email, targetUser.id)
          .then((_user: any) => {
            expect(_user).toBeDefined();
            expect(_user.id).toBe(targetUser.id);
            expect(_user.name).toBe(targetUser.name);
            expect(_user.email).toBe(targetUser.email);
            expect(_user.role).toBe(targetUser.role);
          });
      });

      test("should fail on trying retrieve user with undefined id", () => {
        return logic.retrieveUser(user.email, undefined)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe("Id is required"));
      });

      test("should fail on trying retrieve user with id not existing", () => {
        const unknownId = "unknown";

        return logic.retrieveUser(user.email, unknownId)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe(`Not found user with id ${unknownId}`));
      });
    });

    describe("admin role", () => {
      let targetUser: any;

      beforeEach(async () => {
        const clients: any[] = await logic._listClients();
        const clientsLen: number = clients.length;
        let position: number;

        do {
          position = getRandomInt(0, clientsLen);
          targetUser = clients[position];
        } while (targetUser.id !== admin.id);

        await logic.authenticate(admin.email);
      });

      test("should retrieve user correctly", () => {
        return logic.retrieveUser(admin.email, targetUser.id)
          .then((_user: any) => {
            expect(_user).toBeDefined();
            expect(_user.id).toBe(targetUser.id);
            expect(_user.name).toBe(targetUser.name);
            expect(_user.email).toBe(targetUser.email);
            expect(_user.role).toBe(targetUser.role);
          });
      });

      test("should fail on trying retrieve user with undefined id", () => {
        return logic.retrieveUser(admin.email, undefined)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe("Id is required"));
      });

      test("should fail on trying retrieve user with id not existing", () => {
        const unknownId = "unknown";

        return logic.retrieveUser(admin.email, unknownId)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe(`Not found user with id ${unknownId}`));
      });
    });
  });

  describe("retrieve user by user name", () => {

    describe("user role", () => {
      let targetUser: any;

      beforeEach(async () => {
        const clients: any[] = await logic._listClients();
        const clientsLen: number = clients.length;
        let position: number;

        do {
          position = getRandomInt(0, clientsLen);
          targetUser = clients[position];
        } while (targetUser.id !== user.id);

        await logic.authenticate(user.email);
      });

      test("should retrieve user by user name correctly", () => {
        return logic.retrieveUserByName(user.email, targetUser.name)
          .then((_user: any) => {
            expect(_user).toBeDefined();
            expect(_user.id).toBe(targetUser.id);
            expect(_user.name).toBe(targetUser.name);
            expect(_user.email).toBe(targetUser.email);
            expect(_user.role).toBe(targetUser.role);
          });
      });

      test("should fail on trying retrieve user with undefined user name", () => {
        return logic.retrieveUserByName(user.email, undefined)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe("User name is required"));
      });

      test("should fail on trying retrieve user with user name not existing", () => {
        const unknownUserName = "unknownUnknown";

        return logic.retrieveUserByName(user.email, unknownUserName)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe(`Not found user with user name ${unknownUserName}`));
      });
    });

    describe("admin role", () => {
      let targetUser: any;

      beforeEach(async () => {
        const clients: any[] = await logic._listClients();
        const clientsLen: number = clients.length;
        let position: number;

        do {
          position = getRandomInt(0, clientsLen);
          targetUser = clients[position];
        } while (targetUser.id !== admin.id);

        await logic.authenticate(admin.email);
      });

      test("should retrieve user by user name correctly", () => {
        return logic.retrieveUserByName(admin.email, targetUser.name)
          .then((_user: any) => {
            expect(_user).toBeDefined();
            expect(_user.id).toBe(targetUser.id);
            expect(_user.name).toBe(targetUser.name);
            expect(_user.email).toBe(targetUser.email);
            expect(_user.role).toBe(targetUser.role);
          });
      });

      test("should fail on trying retrieve user with undefined user name", () => {
        return logic.retrieveUserByName(admin.email, undefined)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe("User name is required"));
      });

      test("should fail on trying retrieve user with user name not existing", () => {
        const unknownUserName = "unknownUnknown";

        return logic.retrieveUserByName(admin.email, unknownUserName)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe(`Not found user with user name ${unknownUserName}`));
      });
    });
  });

  describe("list policies by user name", () => {

    describe("user role", () => {
      let targetUser: any;
      let targetUserPolicies: any[];

      beforeEach(async () => {
        const clients: any[] = await logic._listClients();
        const clientsLen: number = clients.length;
        let position: number;

        do {
          position = getRandomInt(0, clientsLen);
          targetUser = clients[position];
        } while (targetUser.id !== user.id);

        const policies: any[] = await logic._listPolicies();
        targetUserPolicies = policies.filter(policy => policy.clientId === targetUser.id);

        await logic.authenticate(user.email);
      });

      test("should fail on trying retrieve the user policy list from user with user role", () => {
        return logic.listPoliciesByUserName(user.email, targetUser.name)
          .catch(err => err)
          .then(({ message }) => {
            expect(message).toBe(`User with email ${user.email} and user role does not have permission to retrieve the policy list of a user`);
          });
      });

      test("should fail on trying retrieve the user policy list with undefined user name", () => {
        return logic.listPoliciesByUserName(user.email, undefined)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe("User name is required"));
      });

      test("should fail on trying retrieve the user policy list with user name not existing", () => {
        const unknownUserName = "unknownUnknown";

        return logic.listPoliciesByUserName(user.email, unknownUserName)
          .catch(err => err)
          .then(({ message }) => {
            expect(message).toBe(`User with email ${user.email} and user role does not have permission to retrieve the policy list of a user`);
          });
      });
    });

    describe("admin role", () => {
      let targetUser: any;
      let targetUserPolicies: any[];

      beforeEach(async () => {
        const clients: any[] = await logic._listClients();
        const clientsLen: number = clients.length;
        let position: number;

        do {
          position = getRandomInt(0, clientsLen);
          targetUser = clients[position];
        } while (targetUser.id !== admin.id);

        const policies: any[] = await logic._listPolicies();
        targetUserPolicies = policies.filter(policy => policy.clientId === targetUser.id);

        await logic.authenticate(admin.email);
      });

      test("should retrieve the user policy list by user name correctly", () => {
        return logic.listPoliciesByUserName(admin.email, targetUser.name)
          .then((policies: any[]) => {
            expect(policies.length).toBe(targetUserPolicies.length);

            targetUserPolicies.forEach(targetUserPolicy => expect(policies).toContainEqual(targetUserPolicy));
          });
      });

      test("should fail on trying retrieve the user policy list with undefined user name", () => {
        return logic.listPoliciesByUserName(admin.email, undefined)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe("User name is required"));
      });

      test("should fail on trying retrieve the user policy list with user name not existing", () => {
        const unknownUserName = "unknownUnknown";

        return logic.listPoliciesByUserName(admin.email, unknownUserName)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe(`Not found user with user name ${unknownUserName}`));
      });
    });
  });

  describe("retrieve user by policy", () => {

    describe("user role", () => {
      let policy: any;
      let targetUser: any;

      beforeEach(async () => {
        const policies: any[] = await logic._listPolicies();
        const policiesLen: number = policies.length;
        const position: number = getRandomInt(0, policiesLen);

        policy = policies[position];

        const clients: any[] = await logic._listClients();

        targetUser = clients.find(client => client.id === policy.clientId);

        await logic.authenticate(user.email);
      });

      test("should fail on trying retrieve the user by policy with user role", () => {
        return logic.retrieveUserByPolicy(user.email, policy.id)
          .catch(err => err)
          .then(({ message }) => {
            expect(message).toBe(`User with email ${user.email} and user role does not have permission to retrieve user by policy`);
          });
      });

      test("should fail on trying retrieve the user policy list with undefined policy id", () => {
        return logic.retrieveUserByPolicy(user.email, undefined)
          .catch(err => err)
          .then(({ message }) => expect(message).toBe("Policy id is required"));
      });

      test("should fail on trying retrieve the user policy list with policy id not existing", () => {
        const unknownPolicyId = "unknownUnknown";

        return logic.retrieveUserByPolicy(user.email, unknownPolicyId)
          .catch(err => err)
          .then(({ message }) => {
            expect(message).toBe(`User with email ${user.email} and user role does not have permission to retrieve user by policy`);
          });
      });
    });
  });

  describe("admin role", () => {
    let policy: any;
    let targetUser: any;

    beforeEach(async () => {
      const policies: any[] = await logic._listPolicies();
      const policiesLen: number = policies.length;
      const position: number = getRandomInt(0, policiesLen);

      policy = policies[position];

      const clients: any[] = await logic._listClients();

      targetUser = clients.find(client => client.id === policy.clientId);

      await logic.authenticate(admin.email);
    });

    test("should retrieve the user by policy correctly", () => {
      return logic.retrieveUserByPolicy(admin.email, policy.id)
        .then((_user: any) => {
            expect(_user).toBeDefined();
            expect(_user.id).toBe(targetUser.id);
            expect(_user.name).toBe(targetUser.name);
            expect(_user.email).toBe(targetUser.email);
            expect(_user.role).toBe(targetUser.role);
        });
    });

    test("should fail on trying retrieve the user policy list with undefined policy id", () => {
      return logic.retrieveUserByPolicy(admin.email, undefined)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe("Policy id is required"));
    });

    test("should fail on trying retrieve the user policy list with policy id not existing", () => {
      const unknownPolicyId = "unknownUnknown";

      return logic.retrieveUserByPolicy(admin.email, unknownPolicyId)
        .catch(err => err)
        .then(({ message }) => expect(message).toBe(`Not found policy with id ${unknownPolicyId}`));
    });
  });
});
