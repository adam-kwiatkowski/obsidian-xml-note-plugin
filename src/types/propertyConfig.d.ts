export interface PropertyConfig {
	label: string;
	path: string[];
	active: boolean;
	children?: PropertyConfig[];
}

interface CheckBoxState {
	[path: string]: boolean;
}
