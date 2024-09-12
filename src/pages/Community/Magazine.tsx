import useFetch from '@/hooks/useFetch';
import BlogPosting from '../Posting/BlogPosting';

function Magazine() {
  const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/tip/records`;

  const { error, status, data } = useFetch(ENDPOINT, 'author_id');
  const tipData = data?.items;
  console.log(tipData);

  if (status === 'loading') {
    // 로딩 스피너 만들면 넣어주기
    return <div>Loading...</div>;
  }
  if (!tipData || tipData.length === 0) {
    return <div>No data available</div>;
  }

  return <>{tipData?.map((d) => <BlogPosting key={d.id} item={d} />)}</>;
}

export default Magazine;
