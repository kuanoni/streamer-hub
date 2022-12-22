import Joi from 'joi';

type CommandParam = {
	key: string;
	required: boolean;
};

type CommandParamValidator = Joi.StringSchema;
