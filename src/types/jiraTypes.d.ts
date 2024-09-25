export interface Rss {
	version: string;
	channel: Channel;
}

export interface Channel {
	title: string;
	link: string;
	description: string;
	language: string;
	buildInfo: BuildInfo;
	item: JiraItem;
}

export interface BuildInfo {
	version: string;
	buildNumber: string;
	buildDate: string;
}

export interface JiraItem {
	title: string;
	link: string;
	project: Project;
	description: Description;
	environment: any; // Can be further specified if known
	key: Key;
	summary: string;
	type: IconText;
	priority: IconText;
	status: Status;
	statusCategory: StatusCategory;
	resolution: Text;
	assignee: User;
	reporter: User;
	labels: any; // Can be further specified if known
	created: string;
	updated: string;
	component: string;
	due: any; // Can be further specified if known
	watches: string;
	issuelinks: IssueLinks;
	attachments: any; // Can be further specified if known
	subtasks: any; // Can be further specified if known
	customfields: CustomFields;
}

export interface Project {
	id: string;
	key: string;
	text: string;
}

export interface Description {
	p: string;
}

export interface Key {
	id: string;
	text: string;
}

export interface IconText {
	id: string;
	iconUrl: string;
	text: string;
}

export interface Status {
	id: string;
	iconUrl: string;
	description: string;
	text: string;
}

export interface StatusCategory {
	id: string;
	key: string;
	colorName: string;
}

export interface Text {
	id: string;
	text: string;
}

export interface User {
	username: string;
	text: string;
}

export interface IssueLinks {
	issuelinktype: IssueLinkType;
}

export interface IssueLinkType {
	id: string;
	name: string;
	inwardlinks: InwardLinks;
}

export interface InwardLinks {
	description: string;
	issuelink: IssueLink;
}

export interface IssueLink {
	issuekey: Key;
}

export interface CustomFields {
	customfield: CustomField[];
}

export interface CustomField {
	id: string;
	key: string;
	customfieldname: string;
	customfieldvalues: CustomFieldValues | null;
}

export interface CustomFieldValues {
	customfieldvalue: string | CustomFieldValueDetails | null;
}

export interface CustomFieldValueDetails {
	key?: string;
	cdata?: string;
	id?: string;
	text?: string;
}

// Root export interface to encapsulate the entire JSON structure
export interface RootObject {
	rss: Rss;
}
