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
		shopProduct: (userId: string) => buildUrl(["product", "shop", userId])
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
		list: (listId: number[], userId: string) => buildUrl(["cart", "cart-list", JSON.stringify(listId), "user", userId])
	},
	address: {
		allFull: () => buildUrl(['full-address']),
		all: (userId: string) => buildUrl(["address", "all", userId])
	}
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
		delete: (cartId: string) => buildUrl(["cart", "delete_cart", cartId]),
		update: (cartId: string) => buildUrl(["cart","update_cart", cartId])
	},
	address: {
		add: (user_id: string) => buildUrl(["address", "create-address", user_id]),
		update: (user_id: string) => buildUrl(["address", "update-address", user_id])
	}
};
