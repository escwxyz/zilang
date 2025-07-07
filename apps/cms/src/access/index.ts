import type { Access } from "payload";

export const isAdmin: Access = ({ req: { user } }) => {
	return Boolean(user?.role === "admin");
};

export const isAuthenticated: Access = ({ req: { user } }) => {
	return Boolean(user);
};

export const isPublic: Access = () => true;

export const isAuthenticatedOrPublished: Access = ({ req: { user } }) => {
	if (user) {
		return true;
	}

	return {
		_status: {
			equals: "published",
		},
	};
};
