export type IAllPages = {
	name: string;
	pages: [
		{ provisionamento: string },
		{ onuDelete: string }
	];
  	} | {
    name: string;
    pages: ({ users: string; olts?: never } | { olts: string; users?: never })[];
};
