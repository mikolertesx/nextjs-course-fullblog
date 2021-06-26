import Head from "next/head";

import { getPostData, getPostsPaths } from "../../lib/posts-util";
import PostContent from "../../components/posts/post-detail/post-content";

const PostDetailsPage = (props) => {
	return (
		<>
			<Head>
				<title>{props.post.title}</title>
				<meta name="description" content={props.post.excerpt} />
			</Head>
			<PostContent post={props.post} />
		</>
	);
};

export function getStaticProps(context) {
	const { params } = context;
	const { slug } = params;

	const postData = getPostData(slug);

	return {
		props: {
			post: postData,
		},
		revalidate: 600,
	};
}

export function getStaticPaths(context) {
	const postFilenames = getPostsPaths();

	const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}

export default PostDetailsPage;
