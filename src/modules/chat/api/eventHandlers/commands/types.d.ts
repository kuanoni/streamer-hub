import Joi from 'joi';

type CommandParam = {
	key: string;
	required: boolean;
	regex?: RegExp;
	rest?: boolean;
};

type CommandParamValidator = Joi.StringSchema;

type ExecutionErrors = string[];

type ExecutionCallback = (...args: string[]) => Promise<ExecutionErrors>;
