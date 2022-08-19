import { GitHubPayload } from "../types/GitHub";
import { sendUpdateMessage } from "./utils/embed";
import { ComponentButtonStyle, ComponentType } from "../types/Messages";
import { hexToDecimal, formatHash, whoToPing } from "./utils/helpers";
import { DeveloperGitHubName } from "../types/Misc";

export async function handleRequest(request: Request) {
	if (!request.headers.get("X-Signature-Ed25519") || !request.headers.get("X-Signature-Timestamp")) {
		const github: GitHubPayload = await request.json();
		if (github.repository.full_name !== REPO_URL) return Response.redirect("https://bulbbot.rocks/");
		if (github.after === github.before) return Response.redirect("https://bulbbot.rocks/");

		const description: string[] = [`\`${formatHash(github.before)}\` → \`${formatHash(github.after)}\` made by **${github.pusher.name}**`, `**Compare:** [Link](${github.compare})`];

		if (github.commits) {
			description.push("\n**Commits**");
			for (const commit of github.commits) {
				description.push(`[\`${formatHash(commit.id)}\`](${commit.url}) ${commit.message} - ${commit.author.username}`);
			}
		}

		await sendUpdateMessage(
			`<@${whoToPing(github.pusher.name as DeveloperGitHubName)}>`,
			[
				{
					title: "🛠️ Master build confirmation",
					description: description.join("\n"),
					color: hexToDecimal("#5865F2"),
				},
			],
			[
				{
					type: 1,
					components: [
						{
							type: ComponentType.BUTTON,
							style: ComponentButtonStyle.SUCCESS,
							label: "Deploy",
							custom_id: `deploy|${github.after.substring(0, 6)}`,
						},
						{
							type: ComponentType.BUTTON,
							style: ComponentButtonStyle.DANGER,
							label: "Ignore",
							custom_id: "ignore",
						},
					],
				},
			],
		);

		return Response.redirect("https://bulbbot.rocks/");
	}

	return Response.redirect("https://bulbbot.rocks/");
}
