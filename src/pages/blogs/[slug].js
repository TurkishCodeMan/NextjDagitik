import FooterSmall from "components/footers/footer-small";
import Navbar from "components/navbars/auth-navbar";
import Seo from "components/seo";
import moment from "moment";
import dynamic from "next/dynamic";
import { client } from "utils/api-client";
import { useUser } from "utils/auth-provider";

const truncateString = (string, length = 100) => string?.slice(0, length) + "…";

const Editor = dynamic(() => import("components/editor"), { ssr: false });

export default function Blog({ post }) {
  const humanizeDate = moment(post?.createdAt).fromNow();
  const { data } = useUser();
  const url =
    post?.contents?.find((val) => val?.type === "image")?.data?.file.url || "";
  return (
    <div className="pt-17">
      <Seo title={`Blog | ${post?.title}`} />
      <Navbar transparent />

      <div className="p-0 flex items-center relative min-h-screen-75">
        <img
          className="absolute w-full h-full bg-cover bg-50 z-1"
          src={url || "url(/bg.jpg)"}
        />
        <div className="absolute w-full h-full bg-black opacity-40 z-2"></div>
        <div className="container mx-auto px-4 z-3">
          <div className="justify-center text-white flex flex-wrap -mx-4">
            <h1 className="text-4xl font-bold leading-tight mt-0  mb-12">
              {post?.title}
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 z-3 -mt-64 pt-20 relative">
        <div className="justify-center text-white flex flex-wrap -mx-4">
          <div className="bg-blueGray-800 rounded-lg shadow-lg w-full">
            <div className="text-center -mt-6">
              <div className="bg-lightBlue-500 rounded-full text-white w-16 h-16 inline-flex items-center justify-center -mt-2">
                <i className="p-1 text-xl far fa-newspaper"></i>
              </div>
            </div>
            <blockquote className="text-xl mx-0 mb-4 block text-center mt-6">
              <small className="font-light">posted {humanizeDate}</small>
              <footer className="text-base block text-blueGray-500">
                <span className="mr-2">
                  {truncateString(post?.description, 30)}
                </span>
                <cite title="Source Title">- {post?.author}</cite>
              </footer>
            </blockquote>
            <p className="mb-0 pt-6 pb-12 px-12 leading-relaxed text-center">
              {post?.description}
            </p>
          </div>
        </div>
      </div>
      <section className="pt-12 relative">
        <div className="container mx-auto px-4">
          <Editor readOnly={true} data={{ blocks: post?.contents }} />
        </div>
      </section>

      <FooterSmall />
    </div>
  );
}
export async function getStaticPaths() {
  const allPosts = await client("blog/get-all-posts");
  console.log(allPosts)
  return {
    paths: allPosts.posts
      .filter((val) => val?.slug !== "")
      .map((s) => ({ params: { slug: s?.slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // const data = await client(`blog/${params.slug}`).then((data) => data);
  return {
    props: {
      post: {},
    },
    revalidate: 15,
  };
}
