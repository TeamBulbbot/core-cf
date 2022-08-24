import { GitHubPayload } from "../types/GitHub";
import { sendUpdateMessage } from "./utils/embed";
import { ComponentButtonStyle, ComponentType } from "../types/Messages";
import { hexToDecimal, formatHash, whoToPing } from "./utils/helpers";
import { DeveloperGitHubName } from "../types/Misc";

export async function handleRequest(request: Request) {
	let github: GitHubPayload;
	try {
		github = await request.json();
	} catch (_) {
		return Response.redirect("https://bulbbot.rocks/");
	}

	if (github.repository.full_name !== REPO_URL) return Response.redirect("https://bulbbot.rocks/");
	if (github.ref !== HEAD_BRANCH) return Response.redirect("https://bulbbot.rocks/");
	if (github.after === github.before) return Response.redirect("https://bulbbot.rocks/");

	const description: string[] = [`\`${formatHash(github.before)}\` → \`${formatHash(github.after)}\` made by **${github.pusher.name}**`, `**Compare:** [Link](${github.compare})`];

	if (github.commits && github.commits?.length > 0) {
		description.push("\n**__Commits__**");
		for (const commit of github.commits) {
			description.push(`[\`${formatHash(commit.id)}\`](${commit.url}) ${commit.message} - ${commit.author.username}`);
		}
	}

	const uid = whoToPing(github.pusher.name as DeveloperGitHubName);

	await sendUpdateMessage(
		uid !== "N/A" ? `<@${uid}>` : undefined,
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
