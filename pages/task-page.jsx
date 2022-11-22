import { Layout } from "components/Layout";
import { Task } from "components/Task";
import { TaskForm } from "components/TaskForm";
import { StateContextProvider } from "context/StateContext";
import { getAllTasksData } from "lib/tasks";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task`;

const TaskPage = ({ staticfilterdTasks }) => {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticfilterdTasks,
  });

  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StateContextProvider>
      <Layout title="Task page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {filteredTasks &&
            filteredTasks.map((task) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
        </ul>
        <Link href="/main-page">
          <div className="flex cursor-pointer mt-12">
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
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
};

export default TaskPage;

export const getStaticProps = async () => {
  const staticfilterdTasks = await getAllTasksData();

  return {
    props: { staticfilterdTasks },
    revalidate: 3,
  };
};
