import {xml2json} from "src/xml2json/xml2json";
import {JiraItem, RootObject} from "../types/jiraTypes";

export function parseJiraItem(xml: string): JiraItem | null {
	const root: RootObject = JSON.parse(xml2json(xml)) as RootObject;
	if (root.rss != null) {
		return root.rss.channel.item;
	}
	return null;
}
