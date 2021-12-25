import "./App.css";
import { VStack, Heading } from "@chakra-ui/react";
import CreateTokenForm from "./components/CreateTokenForm";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<VStack padding={5} margin="auto" mt="20px" width="600px">
					<Routes>
						<Route exact path="/" element={<CreateTokenForm />} />
						<Route
							exact
							path="/interact"
							element={<Heading>Interact With Token</Heading>}
						/>
					</Routes>
				</VStack>
			</Router>
		</div>
	);
}

export default App;
