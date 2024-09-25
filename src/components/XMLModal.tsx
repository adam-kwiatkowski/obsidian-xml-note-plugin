import {ChangeEvent, useEffect, useState} from "react";
import {useApp, usePlugin} from "src/hooks";
import {parseJiraItem} from "src/utils/utils";
import {JiraItem} from "../types/jiraTypes";
import {CheckBoxState, PropertyConfig} from "../types/propertyConfig";
import {flattenConfig, generateConfig} from "../utils/jiraNoteForm";
import {PropertyConfigTable} from "./PropertyConfigTable";

export const XMLModal = () => {
	const app = useApp();
	const plugin = usePlugin();

	const [xml, setXML] = useState("");
	const [jiraItem, setJiraItem] = useState<JiraItem | null>(null);
	const [checkBoxState, setCheckBoxState] = useState<CheckBoxState>({});
	const [propertyConfig, setPropertyConfig] = useState<PropertyConfig[]>([]);

	const handleNewXML = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value;
		const newItem = parseJiraItem(text);

		setXML(text);
		setJiraItem(newItem);
	}

	const checkAll = async (selected: boolean = true) => {
		const newCheckBoxState: CheckBoxState = {};
		if (selected) {
			flattenConfig(propertyConfig).forEach(configItem => {
				newCheckBoxState[configItem.path.join('.')] = selected;
			});
		}
		await updateSettings(newCheckBoxState);
		setCheckBoxState(newCheckBoxState);
	}

	const handleCheckBoxChange = async (path: string[]) => {
		const newCheckBoxState = {...checkBoxState};
		const key = path.join(".");
		newCheckBoxState[key] = !newCheckBoxState[key];
		await updateSettings(newCheckBoxState);
		setCheckBoxState(newCheckBoxState);
	}

	useEffect(() => {
		if (plugin) {
			setCheckBoxState(plugin.settings.checkBoxState);
		}
	}, []);

	const updateSettings = async (state: CheckBoxState) => {
		if (plugin) {
			Object.keys(state).forEach(key => {
				if (!state[key]) {
					delete state[key];
				}
			});
			plugin.settings.checkBoxState = state;
			await plugin.saveSettings();
		}
	}

	useEffect(() => {
		setPropertyConfig(jiraItem ? generateConfig(jiraItem, checkBoxState) : []);
	}, [jiraItem, checkBoxState]);

	return (
		<div>
			<h4>Create a note from Jira XML</h4>
			<textarea value={xml} onChange={handleNewXML} placeholder="Enter Jira XML here..."
					  style={{width: "100%", minHeight: "12em"}}/>

			{jiraItem && (
				<PropertyConfigTable item={jiraItem} properties={propertyConfig} onSelect={handleCheckBoxChange}
									 onSelectAll={checkAll}/>
			)}
		</div>
	);
}
