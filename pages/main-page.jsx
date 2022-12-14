import { Layout } from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const MainPage = () => {
  const router = useRouter();
  const logout = () => {
    cookie.remove("access_token", { path: "/" });
    router.push("/");
  };

  return (
    <Layout title="Main page">
      <div className="mb-10">
        <Link
          className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded"
          href="/blog-page"
        >
          Visit Blog by SSG + ISR
        </Link>
        <Link
          className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded"
          href="/task-page"
        >
          Visit Task by ISR + CSR
        </Link>
      </div>
      <svg
        onClick={logout}
        class="mt-10 cursor-pointer w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        ></path>
      </svg>
    </Layout>
  );
};

export default MainPage;
