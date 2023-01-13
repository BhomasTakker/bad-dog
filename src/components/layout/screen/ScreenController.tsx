import { useMediaQuery, useTheme } from "@mui/material";
import React, { ReactElement, useEffect, ReactNode } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { ScreenWidth, setScreenSize } from "../../../store/screen/screenSlice";

type Props = {
	children: ReactNode;
};

export const ScreenController = ({ children }: Props): ReactElement => {
	const dispatch = useAppDispatch();
	const theme = useTheme();
	//this works perfectly if a little verbose
	const xs = useMediaQuery(theme.breakpoints.down("sm"));
	const sm = useMediaQuery(theme.breakpoints.down("md"));
	const md = useMediaQuery(theme.breakpoints.down("lg"));
	const lg = useMediaQuery(theme.breakpoints.down("xl"));
	const xl = !xs && !sm && !md && !lg;

	let size = ScreenWidth.XS;

	if (xs) size = ScreenWidth.XS;
	if (sm) size = ScreenWidth.SM;
	if (md) size = ScreenWidth.MD;
	if (lg) size = ScreenWidth.LG;
	if (xl) size = ScreenWidth.XL;

	dispatch(setScreenSize(size));

	return <>{children}</>;
};
