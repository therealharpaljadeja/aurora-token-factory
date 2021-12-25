import { mode } from "@chakra-ui/theme-tools";

const Button = {
	variants: {
		base: (props) => ({
			bg: mode(
				"var(--chakra-colors-light-main)",
				"var(--chakra-colors-dark-main)"
			)(props),
			color: mode(
				"var(--chakra-colors-light-white)",
				"var(--chakra-colors-dark-white)"
			)(props),
		}),
	},
	defaultProps: {
		variant: "base",
	},
};

export default Button;
