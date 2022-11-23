export enum Role {
	ADMIN,
	USER,
}

export interface ComponentAuth {
	role: Role;
	loading: React.ReactNode;
	unauthorized: string;
}
