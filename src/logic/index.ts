import { LogicError, AccessDeniedError, NotFoundError } from "./errors";
// import validator from "validator";
// import User, { UserModelInterface } from "../models/user";
// import cloudinary from "../config/cloudinary";
// import Post, { PostModelInterface } from "../models/post";
// import Following from "../models/following";
// import Follower from "../models/follower";
// import Comment, { CommentModelInterface } from "../models/comment";
// import Like from "../models/like";
// import SavedPost, { SavedPostModelInterface } from "../models/saved-post";

const logic = {

  listClients() {},

  listPolicies() {},

  authenticate(email: string) {},

  retrieveUser(token: string, id: string) {},

  retrieveUserByName(token: string, name: string) {},

  listPoliciesByUserName(token: string, userName: string) {},

  retrieveUserByPolicy(token: string, pocilyId: string) {},

};

export default logic;
