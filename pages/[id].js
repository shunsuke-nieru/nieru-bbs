import Link from "next/link";

// post：getStaticPropsから取得したデータ
export default ({ post }) => {
  return (
    <div>
      {post.map((data) => (
        <div>
          <small>
            {data.res}:{data.message}
            <hr />
          </small>
        </div>
      ))}
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
};

/*export const getServerSidePaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`https://nieru.net/_api/board.php?p=1000`);
  const posts = await res.json();

  // 事前ビルドしたいパスを指定
  const paths = posts.map((post) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      id: post.thread_id, //.toString(),
    },
  }));
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  return { paths, fallback: false };
};
*/
// paramsには上記pathsで指定した値が入る（1postずつ）
export const getServerSideProps = async ({ params }) => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`https://nieru.net/_api/thread.php?id=${params.id}`);
  const post = await res.json();

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      post,
    },
  };
};
