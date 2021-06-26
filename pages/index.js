import Head from "next/head";

import { getFeaturedPosts } from "../lib/posts-util";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";

const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>Max's Blog</title>
				<meta
					name="description"
					content="I post about programming and web development."
				/>
			</Head>
			<Hero />
			<FeaturedPosts posts={props.posts} />
		</>
	);
};

export function getStaticProps() {
	const featuredPosts = getFeaturedPosts();

	return {
		props: {
			posts: featuredPosts,
		},
		revalidate: 100,
	};
}

export default HomePage;
