import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/700.css";
import theme from "./theme";

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
