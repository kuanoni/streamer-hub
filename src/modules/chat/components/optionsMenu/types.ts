export interface Section {
	title: string;
	content: OptionItem[];
}

export interface BaseOptionItem {
	label: string;
	key: string;
}

interface CheckboxOptionItem extends BaseOptionItem {
	type: 'checkbox';
}

interface DropdownOptionItem extends BaseOptionItem {
	type: 'dropdown';
	options: string[];
}

export type OptionItem = CheckboxOptionItem | DropdownOptionItem;
