import { useRouter } from "next/router";
import React, { useEffect, ReactNode, ReactElement } from "react";
import { useAppSelector } from "@/store/hooks";
import { locale, dir } from "@/store/locale/localeSlice";

type Props = {
	children: ReactNode;
};

//not really a provider / just a manager
//not sure how to get around the dependency issue at the moment
//if add router, etc, then infinite loop
//because updating router and updating on router update
export const LocaleProvider = ({ children }: Props): ReactElement => {
	const lang = useAppSelector(locale);
	const direction = useAppSelector(dir);
	const router = useRouter();

	const { replace, pathname } = router;

	useEffect(() => {
		const res = replace(pathname, undefined, { locale: lang })
			.then(() => (document.dir = direction))
			.catch((err) => console.log("try catch this " + err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lang, direction]);

	//would we check cookies here or should that be redux?
	//this is a bit of a theory question - should redux manage or store
	return <>{children}</>; //I feel like don't add unnecessary tags but this 'looks' wrong
};
