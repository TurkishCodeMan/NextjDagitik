import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { client } from "./api-client";
import { getToken } from "./auth-provider";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const token = getToken();

  return useMutation(
    (data) =>
      client(`blog/create-post`, {
        method: "POST",
        data: data,
      }),
    {
      onSuccess: (item) => {
        toast(`${item?.slug || "Post"} Create Successfully`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries("post");
      },
    }
  );
}
export function useSinglePost(postSlug) {
  const queryClient = useQueryClient();
  const token = getToken();
  const result = useQuery({
    queryKey: ["post", postSlug],
    queryFn: () => {
      if (postSlug) return client(`blog/${postSlug}`).then((data) => data);
    },
    onSuccess(result) {
      console.log(result);
    },
    keepPreviousData: true,
  });
  return { ...result, post: result?.data || {} };
}
export function useAllPosts() {
  const queryClient = useQueryClient();
  const token = getToken();

  const result = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return client(`blog/get-all-posts`).then((data) => data);
    },
    onSuccess(result) {
      console.log(result);
    },
    keepPreviousData: true,
  });

  return { ...result, posts: result?.data || [] };
}

const getPostSearchConfig = (query) => ({
  queryKey: ["filter-posts", { query }],
  queryFn: () =>
    client(
      `blog/get-all-posts`
    ).then((data) => data),
  config: {
    onSuccess(result) {
      console.log(result);
    },
    keepPreviousData: true,
  },
});

export function useFilterPosts(query) {
  console.log(query)
  const queryClient = useQueryClient();
  const token = getToken();
  console.log(query)
  const result = useQuery(getPostSearchConfig(query));
  console.log(result)
  return { ...result, posts: result?.data?.posts || [] };
}
