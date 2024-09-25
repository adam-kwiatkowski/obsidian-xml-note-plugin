import {CheckBoxState, PropertyConfig} from "../types/propertyConfig";

export const getNestedValue = (obj: any, path: string[]) => {
	return path.reduce((acc, key) => acc[key], obj);
};

export function generateConfig(item: Object, checkBoxState: CheckBoxState): PropertyConfig[] {
	const config: PropertyConfig[] = [];
	const addConfig = (obj: any, path: string[], parent: PropertyConfig | null = null) => {
		const value = getNestedValue(obj, path);
		const label = path[path.length - 1];
		const configItem: PropertyConfig = {
			label,
			path,
			active: checkBoxState[path.join(".")] ?? false
		};
		if (typeof value === "object" && value != null) {
			configItem.children = [];
			Object.keys(value).forEach(key => {
				const newPath = [...path, key];
				addConfig(obj, newPath, configItem);
			});
		}
		if (parent) {
			parent.children?.push(configItem);
		} else {
			config.push(configItem);
		}
	};
	Object.keys(item).forEach(key => {
		const path = [key];
		addConfig(item, path);
	});
	return config;
}

export function flattenConfig(config: PropertyConfig[]): PropertyConfig[] {
	const flattenedConfig: PropertyConfig[] = [];
	const flatten = (configItem: PropertyConfig, parentPath: string[] = []) => {
		const newPath = [...parentPath, configItem.label];
		const newConfigItem: PropertyConfig = {
			label: newPath.join("."),
			path: newPath,
			active: configItem.active
		};
		flattenedConfig.push(newConfigItem);
		if (configItem.children) {
			configItem.children.forEach(child => {
				flatten(child, newPath);
			});
		}
	}
	config.forEach(configItem => {
		flatten(configItem);
	});
	return flattenedConfig;
}
