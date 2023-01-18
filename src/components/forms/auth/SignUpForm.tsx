import styles from "./Auth.module.css";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRouter } from "next/router";
import { createUser } from "../../../queries/auth/createUser";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//convert to seperate pages for sign in and join
//They are two seperate processes etc

import { addNotification } from "../../../store/notifications/notificationSlice";
import { useAppDispatch } from "../../../store/hooks";
import { NOTIFICATIONS } from "../../../lib/notifications/notifications";
import { useTranslation } from "next-i18next";
import { validate } from "../../../lib/validation/form-input-validators";
import { AuthInputs } from "./AuthInputs";
//need schemas and individual rules in a forms/validation lib

//load from somewhere
const schema = yup.object().shape({
	email: validate.email,
	password: validate.password,
	confirm: validate.confirmPassword,
});

export const SignUpForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const methods = useForm({ resolver: yupResolver(schema) });

	const dispatch = useAppDispatch();

	function switchAuthModeHandler() {
		router.replace("/auth/signin");
	}

	async function submitHandler(data: any) {
		try {
			const result = await createUser(data.email, data.password);

			dispatch(addNotification(NOTIFICATIONS.signUpSuccess));
		} catch (err) {
			dispatch(addNotification(NOTIFICATIONS.signUpError));
		}
	}
	return (
		<Box className={styles.content}>
			<Typography variant="h4" component="h1">
				{t("Auth:sign-up")}
			</Typography>
			<section>
				{/* <Typography variant="h3" component="h1">
				{t("Auth:sign-up")}
			</Typography> */}
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(submitHandler)}>
						<Stack spacing={2}>
							<AuthInputs confirmPassword />
							{/* buttons the same but for labels and onClick */}
							<Stack spacing={3}>
								<Button variant="contained" color="primary" type="submit">
									{t("Auth:create-account")}
								</Button>
								<Button
									variant="text"
									color="primary"
									onClick={switchAuthModeHandler}
								>
									{t("Auth:login-with-existing")}
								</Button>
							</Stack>
						</Stack>
					</form>
				</FormProvider>
			</section>
		</Box>
	);
};
