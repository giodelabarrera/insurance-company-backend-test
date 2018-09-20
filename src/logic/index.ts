import { config } from "dotenv";
import { LogicError, AccessDeniedError, NotFoundError } from "./errors";
import fetch from "isomorphic-fetch";
import validator from "validator";

config();

const { DATA_API_URL } = process.env;

const logic = {

  _listClients(): Promise<any[]> | never {
    const clientsEndpoint = "5808862710000087232b75ac";

    return fetch(`${DATA_API_URL}/${clientsEndpoint}`)
      .then((res: Response) => res.json())
      .then((data: any) => data.clients);
  },

  _listPolicies(): Promise<any[]> | never {
    const policiesEndpoint = "580891a4100000e8242b75c5";

    return fetch(`${DATA_API_URL}/${policiesEndpoint}`)
      .then((res: Response) => res.json())
      .then((data: any) => data.policies);
  },

  authenticate(email: string): Promise<boolean> | never {
    let user: any;

    return Promise.resolve()
      .then(() => {
        if (!email) { throw new LogicError("Email is required"); }
        if (!validator.isEmail(email)) { throw new LogicError("Email is invalid"); }

        return logic._listClients();
      })
      .then((clients: any[]) => {
        user = clients.find(client => client.email === email);

        if (!user) { throw new NotFoundError(`Not found user with email ${email}`); }

        return true;
      });
  },

  retrieveUser(email: string, id: string): Promise<any> | never {
    let user: any;
    let targetUser: any;

    return Promise.resolve()
      .then(() => {
        if (!email) { throw new LogicError("Email is required"); }
        if (!validator.isEmail(email)) { throw new LogicError("Email is invalid"); }

        if (!id) { throw new LogicError("Id is required"); }

        return logic._listClients();
      })
      .then((clients: any[]) => {
        user = clients.find(client => client.email === email);

        if (!user) { throw new NotFoundError(`Not found user with email ${email}`); }

        targetUser = clients.find(client => client.id === id);

        if (!targetUser) { throw new NotFoundError(`Not found user with id ${id}`); }

        return targetUser;
      });
  },

  retrieveUserByName(email: string, name: string): Promise<any> | never {
    let user: any;
    let targetUser: any;

    return Promise.resolve()
      .then(() => {
        if (!email) { throw new LogicError("Email is required"); }
        if (!validator.isEmail(email)) { throw new LogicError("Email is invalid"); }

        if (!name) { throw new LogicError("User name is required"); }

        return logic._listClients();
      })
      .then((clients: any[]) => {
        user = clients.find(client => client.email === email);

        if (!user) { throw new NotFoundError(`Not found user with email ${email}`); }

        targetUser = clients.find(client => client.name === name);

        if (!targetUser) { throw new NotFoundError(`Not found user with user name ${name}`); }

        return targetUser;
      });
  },

  listPoliciesByUserName(email: string, userName: string): Promise<any[]> | never {
    let user: any;
    let targetUser: any;

    return Promise.resolve()
      .then(() => {
        if (!email) { throw new LogicError("Email is required"); }
        if (!validator.isEmail(email)) { throw new LogicError("Email is invalid"); }

        if (!userName) { throw new LogicError("User name is required"); }

        return logic._listClients();
      })
      .then((clients: any[]) => {
        user = clients.find(client => client.email === email);

        if (!user) { throw new NotFoundError(`Not found user with email ${email}`); }

        if (user.role !== "admin") {
          throw new AccessDeniedError(`User with email ${user.email} and user role does not have permission to retrieve the policy list of a user`);
        }

        targetUser = clients.find(client => client.name === userName);

        if (!targetUser) { throw new NotFoundError(`Not found user with user name ${userName}`); }

        return logic._listPolicies();
      })
      .then((policies: any[]) => {
        const targetUserPolicies = policies.filter(policy => policy.clientId === targetUser.id);

        return targetUserPolicies;
      });
  },

  retrieveUserByPolicy(email: string, pocilyId: string): Promise<any> | never {
    let user: any;
    let policy: any;

    return Promise.resolve()
      .then(() => {
        if (!email) { throw new LogicError("Email is required"); }
        if (!validator.isEmail(email)) { throw new LogicError("Email is invalid"); }

        if (!pocilyId) { throw new LogicError("Policy id is required"); }

        return logic._listClients();
      })
      .then((clients: any[]) => {
        user = clients.find(client => client.email === email);

        if (!user) { throw new NotFoundError(`Not found user with email ${email}`); }

        if (user.role !== "admin") {
          throw new AccessDeniedError(`User with email ${user.email} and user role does not have permission to retrieve user by policy`);
        }

        return logic._listPolicies();
      })
      .then((policies: any[]) => {
        policy = policies.find(policy => policy.id === pocilyId);

        if (!policy) { throw new NotFoundError(`Not found policy with id ${pocilyId}`); }

        return logic.retrieveUser(user.email, policy.clientId);
      })
      .then((targetUser: any) => targetUser);
  },
};

export default logic;
