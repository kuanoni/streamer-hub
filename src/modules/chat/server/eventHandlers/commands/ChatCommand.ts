import Joi from 'joi';

import { CommandParam, CommandParamValidator, ExecutionCallback, ExecutionErrors } from './types';

class ChatCommand {
	name: string;
	desc: string | null = null;
	paramValidators: CommandParamValidator[] | null = null;
	execCb: ExecutionCallback | null = null;

	constructor(name: string) {
		this.name = name;
	}

	setDescription(desc: string) {
		this.desc = desc;
		return this;
	}

	setParams(params: CommandParam[]) {
		this.paramValidators = params.map((param) => {
			const validator = Joi.string().label(param.key);
			if (param.required) return validator.required();
			else return validator;
		});
		return this;
	}

	setExecCb(execCb: ExecutionCallback) {
		this.execCb = execCb;
		return this;
	}

	async execute(inputs: string[]): Promise<ExecutionErrors> {
		if (!this.name || !this.execCb) return ['missing name or execCb'];

		if (!this.paramValidators || !this.paramValidators.length) return this.execCb();

		const errors: ExecutionErrors = [];
		const args: string[] = [];

		this.paramValidators.forEach((validator, i) => {
			const { error, value } = validator.validate(inputs[i]);

			if (error) errors.push(error.message);
			args.push(value || '');
		});

		if (errors.length) return errors;

		return this.execCb(...args);
	}
}

export default ChatCommand;
