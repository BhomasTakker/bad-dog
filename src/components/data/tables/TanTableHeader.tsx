//Hats off to TanStack if just for this - ohkay
//https://tanstack.com/table/v8/docs/examples/react/sorting

import styles from "./TanTable.module.css";
import { Box, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import React from "react";
import { Column, flexRender, Header, HeaderGroup } from "@tanstack/react-table";

//Is this overkill?
//It 'feels' a lot better but is there a cost?
//After transpiling, can there be?
//Nah - look how complicated this would get
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

//Need to be able to turn sorting on or off
//Is a click have click or no is the easiest
//Need to set sort from settings / beginning

//if you can find a better way to handle all of these

const HeaderCell = ({ header }: { header: Header<unknown, unknown> }) => {
	const { id, column, isPlaceholder } = header;
	const canSort = column.getCanSort();
	const canFilter = column.getCanFilter();

	const pointerClass = canSort ? "cursor-pointer" : "";
	const isSorted = column.getIsSorted();
	const toggleSortHnd = column.getToggleSortingHandler();
	//set class according to Can be sorted or not

	return (
		<TableCell key={id} className={`${styles.cell} ${styles.headCell} `}>
			<Box onClick={toggleSortHnd} className={pointerClass}>
				{isPlaceholder
					? null
					: flexRender(column.columnDef.header, header.getContext())}
				{/* Show something to symbolise sort direction - create a component or something */}
				{{
					//this 8 oof - I actually am wah!
					asc: " 🔼",
					desc: " 🔽",
				}[isSorted as string] ?? null}
			</Box>
			{/* If filterOn - need select correct filter - either simple or ... */}
			<TextFilter column={column} />
		</TableCell>
	);
};

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