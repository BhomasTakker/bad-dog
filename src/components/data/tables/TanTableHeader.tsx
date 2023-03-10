//Hats off to TanStack if just for this - ohkay
//https://tanstack.com/table/v8/docs/examples/react/sorting

import styles from "./TanTable.module.css";
import variables from "@/styles/variables.module.scss";
import { Box, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import React from "react";
import { Column, flexRender, Header, HeaderGroup } from "@tanstack/react-table";

const HeaderRow = ({ headerGroup }: { headerGroup: HeaderGroup<unknown> }) => {
	return (
		<TableRow
			key={headerGroup.id}
			className={`${styles.row} ${styles.headRow}`}
		>
			{headerGroup.headers.map((header) => (
				<HeaderCell key={header.id} header={header} />
			))}
		</TableRow>
	);
};

//could pass in value and onChnage, type, etc
const TextFilter = ({ column }: { column: Column<any, any> }) => {
	const columnFilterValue = column.getFilterValue();

	//just pass options?
	//options.min: 0 {...options}
	//type the possibilities according to given type

	return (
		<TextField
			// color="primary"

			type="text"
			fullWidth={true}
			// name={}
			placeholder="Filter..."
			variant="standard"
			value={(columnFilterValue ?? "") as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
		></TextField>
	);
};

const HeaderCell = ({ header }: { header: Header<unknown, unknown> }) => {
	const { id, column, isPlaceholder } = header;
	const canSort = column.getCanSort();
	const canFilter = column.getCanFilter();

	//need sort this out
	const pointerClass = canSort ? "cursor-pointer" : "";

	//need manage how to sort - at the moment is just text
	const isSorted = column.getIsSorted();
	const toggleSortHnd = column.getToggleSortingHandler();
	//set class according to Can be sorted or not

	const drawSortIcon = () => {
		//need better
		return (
			{
				//this 8 oof - I actually am wah!
				asc: " 🔼",
				desc: " 🔽",
			}[isSorted as string] ?? null
		);
	};

	// drawIcon needs to be inline
	return (
		<TableCell key={id} className={`${styles.cell} ${styles.headCell} `}>
			<Box
				onClick={toggleSortHnd}
				className={pointerClass}
				sx={{ color: variables.textColor }}
			>
				{isPlaceholder
					? null
					: flexRender(column.columnDef.header, header.getContext())}
				{/* Show something to symbolise sort direction - create a component or something */}
				{drawSortIcon()}
			</Box>
			{/* If filterOn - need select correct filter - either simple or ... */}
			{canFilter && <TextFilter column={column} />}
		</TableCell>
	);
};

//Add better styling
//font, size, colour
//shaded/white alpha background colour for filters
//700px width is too much - need think about more responsive / mobile view

export const TanTableHeader = ({
	headerGroups,
}: {
	headerGroups: HeaderGroup<unknown>[];
}) => {
	return (
		<TableHead className={styles.head}>
			{headerGroups.map((headerGroup) => (
				<HeaderRow key={headerGroup.id} headerGroup={headerGroup} />
			))}
		</TableHead>
	);
};
