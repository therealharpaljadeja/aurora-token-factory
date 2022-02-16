import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/700.css";
import theme from "./theme";
import Web3ContextProvider from "./context/Web3Context";
import { TokenFactoryContextProvider } from "./context/TokenFactoryContext";
import { TokenContextProvider } from "./context/TokenContext";
import { NFTContextProvider } from "./context/NFTContext";

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Web3ContextProvider>
				<TokenFactoryContextProvider>
					<TokenContextProvider>
						<NFTContextProvider>
							<App />
						</NFTContextProvider>
					</TokenContextProvider>
				</TokenFactoryContextProvider>
			</Web3ContextProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
