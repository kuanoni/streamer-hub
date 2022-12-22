import Joi from 'joi';

import { CommandParam, CommandParamValidator } from './types';

class CommandBuilder {
	name: string | null = null;
	desc: string | null = null;
	params: CommandParamValidator[] | null = null;
	execCb: Function | null = null;

	setName(name: string) {
		this.name = name;
		return this;
	}

	setDescription(desc: string) {
		this.desc = desc;
		return this;
	}

	setParams(params: CommandParam[]) {
		this.params = params.map((param) => {
			const validator = Joi.string().label(param.key);
			if (param.required) return validator.required();
			else return validator;
		});
		return this;
	}

	setExecCb(execCb: Function) {
		this.execCb = execCb;
		return this;
	}

	execute(inputs: string[]) {
		if (!this.name || !this.execCb) return;

		if (this.params) {
			const errors: string[] = [];
			const execCbParams: { [i: string]: string | undefined } = {};
			console.log(this.params);

			this.params.forEach((validator, i) => {
				const key = validator.$_getFlag('label');
				const { error, value } = validator.validate(inputs[i]);

				if (error) errors.push(error.message);

				execCbParams[key] = value;
			});

			console.log(errors);

			this.execCb(execCbParams);
		}
	}
}

export default CommandBuilder;
