import { Embed, ComponentButton, Message } from "../../types/Messages";

export async function sendUpdateMessage(content: string, embeds: Embed[] | undefined, components: ComponentButton[]): Promise<Response> {
	try {
		const r = await fetch(`https://discord.com/api/v10/channels/${DEPLOY_CHANNEL_ID}/messages`, {
			method: "POST",
			headers: { authorization: `Bot ${DISCORD_TOKEN}`, "content-type": "application/json" },
			body: JSON.stringify({
				content,
				embeds,
				components,
			}),
		});
		return await r.json();
	} catch (err) {
		console.error(`Send message update error`, err);
		return Response.redirect("https://bulbbot.rocks");
	}
}
