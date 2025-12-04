import { BaseError, HttpBaseError, HttpBaseErrorWithMessage } from "./baseErrors";

//api Errors
export class MissingApiKeyError extends BaseError {}
export class ApiKeyDeleteError extends BaseError {}

export class QuotaError extends HttpBaseErrorWithMessage {}
export class HttpError extends HttpBaseError {}
export class ApiCommunicationError extends HttpBaseErrorWithMessage {}
export class ApiKeyInvalidError extends HttpBaseErrorWithMessage {}

//Git Errors
export class GitError extends BaseError {}

//Gemini Errors
export class InvalidPromptError extends BaseError {}
export class InvalidArgumentError extends BaseError {}
export class GeminiResponseParseError extends BaseError {}
export class GenerateCommitMessageError extends BaseError {}
export class CreateBranchError extends BaseError {}