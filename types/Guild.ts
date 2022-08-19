import { User } from "./Global";

export interface GuildMember {
	user?: User;
	nick?: string | null;
	avatar?: string | null;
	roles: string[];
	joined_at: string;
	premium_since?: string | null;
	deaf: boolean;
	mute: boolean;
	pending?: boolean;
	permissions?: string;
	communication_disabled_until?: string | null;
}
