import {createContext} from "react";
import {App} from "obsidian";
import XmlNotePlugin from "../main";

export const AppContext = createContext<App | undefined>(undefined);
export const PluginContext = createContext<XmlNotePlugin | undefined>(undefined);
