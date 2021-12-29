import { mode } from "@chakra-ui/theme-tools";
export default {
	parts: ["label"],
	baseStyle: {
		label: (props) => ({
			bg: mode(
				"var(--chakra-colors-light-background)",
				"var(--chakra-colors-dark-background)"
			)(props),
			color: mode(
				"var(--chakra-colors-light-text)",
				"var(--chakra-colors-dark-text)"
			),
		}),
	},
};
