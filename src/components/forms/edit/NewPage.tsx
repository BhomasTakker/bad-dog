import React from "react";
import { Box } from "@mui/material";
import { HeaderForm } from "../../header/edit/HeaderForm";
import { PageForm } from "./PageForm";
import { EditContextProvider } from "@/src/context/edit-context";

export const NewPage = () => {
	return (
		<Box>
			<EditContextProvider>
				{/* Header Edit would be a better name - show create header button if no header exists  */}
				<HeaderForm />
				{/* Show what route this is - if no associated page data then create new - ?? */}

				{/* Pass route in - Or create a temporary hash/map of pages with a key of the endpoint */}
				<PageForm />
			</EditContextProvider>
		</Box>
	);
};
