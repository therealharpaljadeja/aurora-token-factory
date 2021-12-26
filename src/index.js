import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/700.css";
import theme from "./theme";
import Web3ContextProvider from "./context/Web3Context";

ReactDOM.render(
	<React.StrictMode>
		<Web3ContextProvider>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</Web3ContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
