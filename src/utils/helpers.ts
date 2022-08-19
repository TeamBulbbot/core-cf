import { DeveloperGitHubName } from "../../types/Misc";

export const respond = (response: any) =>
	new Response(JSON.stringify(response), {
		headers: { "content-type": "application/json" },
	});

export function hexToDecimal(hex: string): number {
	return parseInt(`0x${hex.replace("#", "")}`, 16);
}

export function formatHash(hash: string): string {
	return hash.substring(0, 6);
}

export function whoToPing(username: DeveloperGitHubName): string {
	const DEVELOPERS = {
		y3ll0wlife: "190160914765316096",
		wakfi: "193160566334947340",
		KlukCZ: "439396770695479297",
	};

	return DEVELOPERS[username];
}
