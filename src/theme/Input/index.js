import { mode } from "@chakra-ui/theme-tools";

const Input = {
	baseStyles: (props) => ({
		_focus: {
			borderColor: mode(
				"var(--chakra-colors-light-main)",
				"var(--chakra-colors-dark-main)"
			)(props),
			boxShadow: mode(
				"0 0 0 1px var(--chakra-colors-light-main)",
				"0 0 0 1px var(--chakra-colors-dark-main)"
			)(props),
		},
	}),
};

export default Input;
