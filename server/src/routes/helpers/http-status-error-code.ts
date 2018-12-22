import { LogicError, NotFoundError, AccessDeniedError } from "../../logic/errors";

/**
 * Get Http status error code
 *
 * @param {Error} err - The Error class to determine the error code
 * @returns {number} The Http status error code
 */
const httpStatusErrorCode = (err: Error) => {
  let status = 500;
  if (err instanceof LogicError) { status = 400; }
  if (err instanceof AccessDeniedError) { status = 403; }
  if (err instanceof NotFoundError) { status = 404; }

  return status;
};

export default httpStatusErrorCode;
