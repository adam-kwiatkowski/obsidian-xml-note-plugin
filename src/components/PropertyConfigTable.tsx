import {PropertyConfig} from "../types/propertyConfig";
import {flattenConfig, getNestedValue} from "../utils/jiraNoteForm";
import {ChangeEvent, useState} from "react";

interface PropertyConfigTableProps {
	item: Object;
	properties: PropertyConfig[];
	onSelect: (path: string[]) => void;
	onSelectAll: (selected: boolean) => void;
}

export function PropertyConfigTable(props: PropertyConfigTableProps) {
	const flatConfig = flattenConfig(props.properties);
	const [selectAll, setSelectAll] = useState(false);

	const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectAll(e.target.checked);
		props.onSelectAll(e.target.checked);
	}

	const getValue = (path: string[]) => {
		const value = getNestedValue(props.item, path);
		if (value == null) {
			return "";
		}
		return value.toString();
	}

	return (
		<table style={{width: "100%"}}>
			<thead>
			<tr>
				<th>
					<input type="checkbox" checked={selectAll} onChange={handleSelectAll}/>
				</th>
				<th>Label</th>
				<th>Value</th>
			</tr>
			</thead>
			<tbody>
			{flatConfig.map((configItem, index) => (
				<tr key={index}>
					<td>
						<input type="checkbox" checked={configItem.active}
							   onChange={() => props.onSelect(configItem.path)}/>
					</td>
					<td>{configItem.label}</td>
					<td>{getValue(configItem.path)}</td>
				</tr>
			))}
			</tbody>
		</table>
	);
}
