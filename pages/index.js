import Link from "next/link";

// posts：getStaticPropsで取得したデータを受け取る
const Home = ({ posts }) => {
  return (
    <div>
      <h1>記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.thread_id}>
            {/* リンク先を指定 */}
            <Link href={`/${post.thread_id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ビルド時にデータを取得し静的なファイルを事前に生成
export const getServerSideProps = async () => {
  // 全記事データを取得
  const res = await fetch("https://nieru.net/_api/board.php?p=1000");
  const posts = await res.json();

  // コンポーネントに渡すデータを指定
  return {
    props: {
      posts,
    },
  };
};

export default Home;
