import { Layout } from "components/Layout";
import { getAllPostIds, getPostData } from "lib/posts";
import { getAllTaskIds, getTaskData } from "lib/tasks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Task = ({ staticTask, id }) => {
  const router = useRouter();
  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      fallbackData: staticTask,
    }
  );

  useEffect(() => {
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={task.title}>
      <p className="mb-4">
        {"ID : "}
        {task.id}
      </p>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page">
        <div className="flex cursor-pointer mt-8">
          <svg
            class="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            ></path>
          </svg>
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Task;

export const getStaticPaths = async () => {
  const paths = await getAllTaskIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const staticTask = await getTaskData(params.id);

  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
};
