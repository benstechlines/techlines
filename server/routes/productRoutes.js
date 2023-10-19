import express from 'express';
import Product from '../models/Product.js';
import { protectRoute } from '../middleware/authMiddleware.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
	const page = parseInt(req.params.page); // 1, 2 or 3
	const perPage = parseInt(req.params.perPage); // 10

	const products = await Product.find({});

	if (page && perPage) {
		const totalPages = Math.ceil(products.length / perPage);
		const startIndex = (page - 1) * perPage;
		const endIndex = startIndex + perPage;
		const paginatedProducts = products.slice(startIndex, endIndex);
		res.json({ products: paginatedProducts, pagination: { currentPage: page, totalPages } });
	} else {
		res.json({ products, pagination: {} });
	}
};

const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
};

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment, userId, title } = req.body;

	const product = await Product.findById(req.params.id);
	const user = await User.findById(userId);

	if (product) {
		const alreadyReviewed = product.reviews.find((review) => review.user.toString() === user._id.toString());

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed.');
		}

		const review = {
			name: user.name,
			rating: Number(rating),
			comment,
			title,
			user: user._id,
		};

		product.reviews.push(review);

		product.numberOfReviews = product.reviews.length;
		product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
		await product.save();
		res.status(201).json({ message: 'Review has been saved.' });
	} else {
		res.status(404);
		throw new Error('Product not found.');
	}
});

productRoutes.route('/:page/:perPage').get(getProducts);
productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);
productRoutes.route('/reviews/:id').post(protectRoute, createProductReview);

export default productRoutes;
