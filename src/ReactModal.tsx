import {App, Modal} from "obsidian";
import {createRoot, Root} from "react-dom/client";
import {ComponentType, StrictMode} from "react";
import {AppContext, PluginContext} from "./context";
import XmlNotePlugin from "../main";

const VIEW_TYPE_MODAl = "modal-view";

export default class ReactModal extends Modal {
	root: Root | null = null;
	plugin?: XmlNotePlugin;
	ChildComponent: ComponentType<any>;

	constructor(app: App, ChildComponent: ComponentType<any>, plugin?: XmlNotePlugin) {
		super(app);
		this.ChildComponent = ChildComponent;
		this.plugin = plugin;
	}

	getViewType() {
		return VIEW_TYPE_MODAl;
	}

	getDisplayText() {
		return "Modal view";
	}

	async onOpen() {
		this.root = createRoot(this.contentEl);
		this.root.render(
			<AppContext.Provider value={this.app}>
				<PluginContext.Provider value={this.plugin}>
					<StrictMode>
						<this.ChildComponent/>
					</StrictMode>
				</PluginContext.Provider>
			</AppContext.Provider>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}
