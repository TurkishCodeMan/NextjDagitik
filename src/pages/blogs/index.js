import React from "react";
import CircleLoader from "components/circle-loader";
import Navbar from "components/navbars/auth-navbar";
import Seo from "components/seo";
import moment from "moment";
import Link from "next/link";
import { useUser } from "utils/auth-provider";
import { useFilterPosts } from "utils/posts";
import { useAllPosts } from "utils/posts";
import PageHeader from "components/page-header";

export default function Blogs() {
  // const { posts, isLoading } = useAllPosts();
  const [query, setQuery] = React.useState("");
  const { posts, isLoading } = useFilterPosts(query.toLowerCase());
  const { data: user } = useUser();
  const humanizeDate = (date) => moment(date).fromNow();
  const getImageurl = (post) =>
    post?.contents?.find((val) => val?.type === "image")?.data?.file.url || "";
  console.log(posts);
  return (
    <>
      <Seo title="Blogs" />
      <Navbar transparent />
      <main className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="mb-12 flex flex-wrap -mx-4 justify-center">
              <PageHeader className="hidden" />
              <div className="relative w-full">
                <div className="absolute flex items-center ml-2 h-full">
                  <svg
                    className="w-4 h-4 fill-current text-primary-gray-dark"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  maxLength="20"
                  placeholder="Search by post.."
                  onChange={(ev) => setQuery(ev.target.value)}
                  className="px-8 py-3 w-full rounded-md  bg-white border-transparent focus:border-gray-300 focus:bg-white focus:ring-0 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts &&
              posts.length > 0 &&
              posts.map((post) => (
                <Link key={post._id} href={`/blogs/${post.slug}`}>
                  <div className="mb-12 cursor-pointer relative flex  min-w-0 break-words bg-white w-full shadow-lg rounded-lg">
                    <div className=" flex flex-wrap -mx-4">
                      <div className="px-4 relative w-full lg:w-4/12">
                        <img
                          src={
                            getImageurl(post) ||
                            "https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80"
                          }
                          className="w-full h-full rounded-lg max-h-80 rounded-r-none"
                          alt="..."
                        />
                      </div>
                      <div className="px-4 relative w-full lg:w-8/12">
                        <div className="lg:pl-0 px-4 py-5 flex-auto">
                          <h3 className="text-3xl font-semibold text-blueGray-700 leading-tight">
                            <a href="#pablo">{post.title}</a>
                          </h3>
                          <p className="mt-3 text-lg leading-relaxed text-blueGray-500">
                            <span className="mr-2">
                              {post.description
                                ? post.description
                                : "Finding temporary housing should be as easy as..."}
                            </span>
                            <a href="#pablo" className="text-lightBlue-500">
                              Read More
                            </a>
                          </p>
                          <div className="mt-6">
                            <a
                              href="#pablo"
                              className="inline-flex items-center"
                            >
                              <div className="flex-1">
                                <div className="justify-between items-center">
                                  <h6 className="text-md font-bold uppercase mt-0 mb-0 text-blueGray-500">
                                    {post?.author}
                                  </h6>
                                  <small className="text-sm text-blueGray-500 mt-0">
                                    Published {humanizeDate(post.createdAt)}
                                  </small>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            {!posts?.length > 0 && !isLoading && (
              <div>{`${query}`} Not Found !</div>
            )}
            {isLoading && <CircleLoader />}
          </div>
        </div>
      </main>
    </>
  );
}
