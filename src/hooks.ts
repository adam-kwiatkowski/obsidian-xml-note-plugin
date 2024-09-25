import {useContext} from "react";
import {AppContext, PluginContext} from "./context";
import {App} from "obsidian";
import XmlNotePlugin from "../main";

export const useApp = (): App | undefined => {
	return useContext(AppContext);
};

export const usePlugin = (): XmlNotePlugin | undefined => {
	return useContext(PluginContext);
}
