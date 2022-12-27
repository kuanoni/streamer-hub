import Joi from 'joi';

import { AuthPerms } from '@globalTypes/user';

import { CommandParam, CommandParamValidator, ExecutionCallback, ExecutionErrors } from './types';

class ChatCommand {
	name: string;
	desc: string | null = null;
	authLevel: AuthPerms = 0;
	paramValidators: CommandParamValidator[] | null = null;
	execCb: ExecutionCallback | null = null;

	constructor(name: string) {
		this.name = name;
	}

	setDescription(desc: string) {
		this.desc = desc;
		return this;
	}

	setAuthLevel(authLevel: AuthPerms) {
		this.authLevel = authLevel;
		return this;
	}

	setParams(params: CommandParam[]) {
		this.paramValidators = params.map((param) => {
			let validator = Joi.string().label(param.key);
			if (param.regex) validator = validator.regex(param.regex).message(`Invalid "${param.key}" format`);
			if (param.rest) validator = validator.tag('rest');
			if (param.required) validator = validator.required();

			return validator;
		});
		return this;
	}

	setExecCb(execCb: ExecutionCallback) {
		this.execCb = execCb;
		return this;
	}

	async execute(inputs: string[]): Promise<ExecutionErrors> {
		if (!this.name) throw new Error(`ChatCommand missing name`);
		if (!this.execCb) throw new Error(`ChatCommand ${this.name} missing execution callback`);

		// if there are no parameter validators, the execution callback will be run without args
		if (!this.paramValidators || !this.paramValidators.length) return this.execCb();

		const errors: ExecutionErrors = [];
		const args: string[] = [];

		// validate inputs using paramValidators
		this.paramValidators.forEach((validator, i) => {
			const isRest = validator.$_terms.tags.includes('rest');
			const { error, value } = validator.validate(isRest ? inputs.slice(i).join(' ') : inputs[i]);

			if (error) errors.push(error.message);
			args.push(value || '');
		});

		if (errors.length) return errors;

		return this.execCb(...args);
	}
}

export default ChatCommand;
