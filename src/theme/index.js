import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import Button from "./Button";
import Input from "./Input";

const theme = extendTheme({
	initialColorMode: "light",
	styles: {
		global: (props) => ({
			body: {
				background: mode(
					"var(--chakra-colors-light-background)",
					"var(--chakra-colors-dark-background)"
				)(props),
			},
		}),
	},
	fonts: {
		heading: "DM Sans",
		body: "DM Sans",
	},
	colors: {
		light: {
			background: "#f4f4f5",
			heading: "#192228",
			text: "#19222899",
			background_alt: "#041417",
			main: "#da3ab3",
			white: "#ffffff",
		},
		dark: {
			background: "#041417",
			heading: "#ffffff",
			text: "#f4f4f599",
			main: "#78d64b",
			white: "#ffffff",
		},
	},
	components: {
		Text: {
			baseStyle: (props) => ({
				color: mode(
					"var(--chakra-colors-light-text)",
					"var(--chakra-colors-dark-text)"
				)(props),
			}),
		},
		Button,
		Input,
	},
});

export default theme;
