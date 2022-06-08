import React from "react";

// components
import Admin from "layouts/admin";
import dynamic from "next/dynamic";
import Seo from "components/seo";
import withAdmin from "utils/with-auth";
import { useCreatePost } from "utils/posts";
import CircleLoader from "components/circle-loader";
import { useRouter } from "next/router";
import withAuth from "utils/with-auth";
const Editor = dynamic(() => import("components/editor"), { ssr: false });

function Dashboard() {
  const [editorContent, setEditorContent] = React.useState();
  const { mutateAsync: addPost, isLoading, isSuccess } = useCreatePost();
  const router = useRouter();
  async function changeEditor(editor, val) {
    const data = await editor.current.save();
    setEditorContent(data.blocks);
    console.log(data);
  }
  function submitHandler(event) {
    event.preventDefault();
    const { title, description } = event.target.elements;
    addPost({
      title: title.value,
      description: description.value,
      contents: editorContent,
    });
  }
  React.useEffect(() => {
    if (isSuccess) router.push("/blogs");
  }, [isSuccess]);
  return (
    <Admin>
      <Seo title="Dashboard" />

      <div className="flex flex-wrap justify-center w-full h-full">
        <form className="w-full md:w-1/2 lg:w-full" onSubmit={submitHandler}>
          <label htmlFor="title">
            Title
            <input
              id="title"
              name="title"
              maxLength="50"
              placeholder="Title"
              className="border-0 px-1 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              id="description"
              name="description"
              maxLength="80"
              placeholder="Description"
              className="border-0 px-1 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
            />
          </label>

          <label htmlFor="editor">
            Content
            <div className="bg-white rounded-md w-full">
              <Editor id="editor" onChange={changeEditor} />
            </div>
          </label>
          <div className="flex gap-4 justify-end my-4">
            <button className="bg-blueGray-200 py-2 px-3 rounded">Close</button>
            <button
              type="submit"
              className="bg-blue-300 flex items-center gap-3 py-2 px-3 rounded"
            >
              <p>Submit</p> {isLoading && <CircleLoader />}
            </button>
          </div>
        </form>
      </div>
    </Admin>
  );
}

export default withAuth(Dashboard);
