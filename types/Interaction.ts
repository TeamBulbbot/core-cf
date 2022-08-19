import { GuildMember } from "./Guild";
import { User } from "./Global";
import { Message } from "./Messages";

export interface Interaction {
	id: string;
	application_id: string;
	type: InteractionType;
	data?: InteractionData;
	guild_id?: string;
	channel_id?: string;
	member?: GuildMember;
	user?: User;
	token: string;
	version: number;
	message?: Message;
	locale?: string;
	guild_locale?: string;
}

export enum InteractionType {
	PING = 1,
	APPLICATION_COMMAND = 2,
	MESSAGE_COMPONENT = 3,
	APPLICATION_COMMAND_AUTOCOMPLETE = 4,
	MODAL_SUBMIT = 5,
}

interface InteractionData {
	id: string;
	name: string;
	type: number;
	resolved?: any; // https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure
	options?: any[]; // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-interaction-data-option-structure
	guild_id?: string;
	custom_id?: string;
	component_type?: number;
	values?: any[]; // https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure
	target_id?: string;
	components?: any[]; // https://discord.com/developers/docs/interactions/message-components#message-components
}
