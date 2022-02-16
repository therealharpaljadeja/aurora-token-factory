import { useState, useContext } from "react";
import {
	VStack,
	Button,
	FormControl,
	FormLabel,
	Input,
	useColorModeValue,
	Image,
	Box,
	Icon,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";
import { NFTContext } from "../context/NFTContext";
import { NFTStorage, File } from "nft.storage";
import { Buffer } from "buffer";

const client = new NFTStorage({
	token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
});

function CreateNFTForm() {
	const { mintNFT, deployingNFT, tokenBalance } = useContext(NFTContext);

	const [mintingNFT, setMintingNFT] = useState(false);
	const [isImageUploaded, setIsImageUploaded] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [fileObj, setFileObj] = useState(null);
	const [imageFile, setImageFile] = useState(null);

	const imageUploadBg = useColorModeValue(
		"var(--chakra-colors-pink-100)",
		"var(--chakra-colors-pink-700)"
	);

	const handleImageUpload = async ({ target }) => {
		setImageFile(URL.createObjectURL(target.files[0]));
		if (target.files && target.files[0]) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(target.files[0]);
			reader.onloadend = async () => {
				let imageData = Buffer(reader.result);
				let fileObj = new File([imageData], target.files[0].name, {
					type: "image/*",
				});
				setFileObj(fileObj);
			};
		}
	};

	const handleInputChange = (e, setter) => {
		setter(e.target.value);
	};

	const mintNFTWithMetadata = async () => {
		console.log(await tokenBalance());
		const metadata = await client.store({
			name: title,
			description,
			image: fileObj,
		});

		let metadataSplit = metadata.url.split("/", 4);
		const url =
			"https://ipfs.io/ipfs/" +
			metadataSplit[metadataSplit.length - 2] +
			"/" +
			metadataSplit[metadataSplit.length - 1];
		await mintNFT(url);
	};

	return (
		<VStack spacing={5} alignItems="center" width="350px">
			<FormControl display="flex" justifyContent="center">
				<FormLabel>
					{imageFile !== null ? (
						<Image
							margin="auto"
							width="250px"
							height="250px"
							textAlign="center"
							src={imageFile}
						/>
					) : (
						<Box
							w="250px"
							h="250px"
							background={imageUploadBg}
							borderRadius={5}
							padding={2}
							_hover={{ cursor: "pointer" }}
						>
							<VStack
								w="100%"
								h="100%"
								border="2px dashed"
								borderRadius={5}
								justifyContent="center"
							>
								<Icon w="20px" h="20px" as={AiOutlineCamera} />
								<Text>Upload Image</Text>
							</VStack>
						</Box>
					)}
				</FormLabel>
				<Input
					display="none"
					type="file"
					onChange={handleImageUpload}
					accept="image/*"
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Title</FormLabel>
				<Input
					onChange={(e) => handleInputChange(e, setTitle)}
					value={title}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Description</FormLabel>
				<Textarea
					onChange={(e) => handleInputChange(e, setDescription)}
					value={description}
				/>
			</FormControl>
			<Button isLoading={deployingNFT} onClick={mintNFTWithMetadata}>
				Mint NFT
			</Button>
		</VStack>
	);
}

export default CreateNFTForm;
