import { config } from "dotenv";
import { LogicError, AccessDeniedError, NotFoundError } from "./errors";
import fetch from "isomorphic-fetch";
import validator from "validator";

config();

const { DATA_API_URL } = process.env;

/**
 * logic
 *
 * @version 1.0.0
 */
const logic = {

  /**
   * List the data service clients
   *
   * @returns {(Promise<any[]> | never)} Promise object with the clients
   */
  _listClients(): Promise<any[]> | never {
    const clientsEndpoint = "5808862710000087232b75ac";

    return fetch(`${DATA_API_URL}/${clientsEndpoint}`)
      .then((res: Response) => res.json())
      .then((data: any) => data.clients);
  },

  /**
   * List the data service policies
   *
   * @returns {(Promise<any[]> | never)} Promise object with the policies
   */
  _listPolicies(): Promise<any[]> | never {
    const policiesEndpoint = "580891a4100000e8242b75c5";

    return fetch(`${DATA_API_URL}/${policiesEndpoint}`)
      .then((res: Response) => res.json())
      .then((data: any) => data.policies);
  },

  /**
   * Authenticate a user
   *
   * @param {string} email - The email to authenticate user
   * @returns {(Promise<boolean> | never)} Promise object with the response of the authentication
   */
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

  /**
   * Retrieve user by id
   *
   * @param {string} email - The email to authenticate user
   * @param {string} id - The id to retrieve user
   * @returns {(Promise<any> | never)} Promise object with the target user
   */
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

  /**
   * Retrieve user by name
   *
   * @param {string} email - The email to authenticate user
   * @param {string} name - The name to retrieve user
   * @returns {(Promise<any> | never)} Promise object with the target user
   */
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

  /**
   * List user policies by user name
   *
   * @param {string} email - The email to authenticate user
   * @param {string} userName - The user name to policies user
   * @returns {(Promise<any[]> | never)} Promise object with the policies user
   */
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

  /**
   * Retrieve user by policy id
   *
   * @param {string} email - The email to authenticate user
   * @param {string} pocilyId - The policy id to retrieve user
   * @returns {(Promise<any> | never)} Promise object with policy user
   */
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
