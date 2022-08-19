import { User } from "./Global";
import { GuildMember } from "./Guild";

export interface Message {
	id: string;
	channel_id: string;
	guild_id?: string;
	author: User;
	member?: GuildMember;
	content: string;
	timestamp: string;
	edited_timestamp: string | null;
	tts: boolean;
	mention_everyone: boolean;
	mentions: User[];
	mention_roles: string[];
	mention_channels: any[]; // https://discord.com/developers/docs/resources/channel#channel-mention-object
	attachments: any[]; // https://discord.com/developers/docs/resources/channel#attachment-object
	embeds: any[]; // https://discord.com/developers/docs/resources/channel#embed-object
	reactions?: any[]; // https://discord.com/developers/docs/resources/channel#reaction-object
	nonce?: number | string;
	pinned: boolean;
	webhook_id?: string;
	type: number;
	activity?: any; // https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure
	application?: any; // https://discord.com/developers/docs/resources/application#application-object
	application_id?: string;
	message_reference?: any; // https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure
	flags?: number;
	referenced_message?: any | null; // https://discord.com/developers/docs/resources/channel#message-object
	interaction?: any; // https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure
	thread?: any; // https://discord.com/developers/docs/resources/channel#channel-object
	components?: any[]; // https://discord.com/developers/docs/interactions/message-components#component-object
	sticker_items?: any[]; // https://discord.com/developers/docs/resources/sticker#sticker-item-object
	stickers?: any[]; // Deprecated https://discord.com/developers/docs/resources/sticker#sticker-object
}

export interface Embed {
	title?: string;
	type?: "rich";
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: {
		text: string;
		icon_url?: string;
		proxy_icon_url?: string;
	};
	image?: {
		url: string;
		proxy_icon_url?: string;
		height?: number;
		width?: number;
	};
	thumbnail?: {
		url: string;
		proxy_icon_url?: string;
		height?: number;
		width?: number;
	};
	provider?: {
		name?: string;
		url?: string;
	};
	author?: {
		name: string;
		url?: string;
		icon_url?: string;
		proxy_icon_url?: string;
	};
	fields?: {
		name: string;
		value: string;
		inline?: boolean;
	}[];
}

export interface ComponentButton {
	type: 1;
	components: { type: ComponentType.BUTTON; style: ComponentButtonStyle; label?: string; emoji?: string; custom_id?: string; url?: string; disabled?: boolean }[];
}
export enum ComponentButtonStyle {
	PRIMARY = 1,
	SECONDARY = 2,
	SUCCESS = 3,
	DANGER = 4,
	LINK = 5,
}

export enum ComponentType {
	ACTION_ROW = 1,
	BUTTON = 2,
	SELECT_MENU = 3,
	TEXT_INPUT = 4,
}
