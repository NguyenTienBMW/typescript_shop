const host = "http://localhost:8000";

const buildUrl = (path: string[]) => {
	return `${host}/${path.join("/")}`;
};

export const QueryAPI = {
	user: {
		all: () => buildUrl(["user"]),
		single: (userId: string) => {
			return buildUrl(["user", userId]);
		},
	},
	product: {
		all: () => buildUrl(["product"]),
		recommend: (userId: string) => buildUrl(["recommend", userId]),
		single: (productId: string) => {
			return buildUrl(["product", productId]);
		},
	},
	recommend: {
		all: () => buildUrl(["recommend"]),
		single: (productId: string) => {
			return buildUrl(["recommend", productId]);
		},
	},
	category: {
		all: () => buildUrl(["category"]),
		single: (categoryId: string) => {
			return buildUrl(["category", categoryId]);
		},
	},
	comment: {
		all: (productId: string) => buildUrl(["rate", "product", productId]),
		checkComment: (userId: string, productId: string) =>
			buildUrl(["rate", "check_rating", "user", userId, "product", productId]),
	},
	cart: {
		all: (userId: string) => buildUrl(["cart", userId]),
	},
};

export const Command = {
	user: {
		register: () => buildUrl(["register"]),
		login: () => buildUrl(["login"]),
	},
	comment: {
		add: () => buildUrl(["rate", "create_rate"]),
	},
	cart: {
		add: () => buildUrl(["cart", "add_cart"]),
	},
	payment: {
		add: () => buildUrl(["pay"]),
	},
};
