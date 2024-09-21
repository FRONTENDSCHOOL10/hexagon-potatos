import SquarePostingCard from '@/components/PostingCard/SquarePostingCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/posting/records`;

const RecommendFeed = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosting = async () => {
      try {
        const response = await axios.get(ENDPOINT, {
          signal: abortController.signal,
        });
        console.log(response.data.items);
        setData(response.data.items);
        setLoading(false);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.name !== 'CanceledError') {
            return;
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosting();

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) return null;

  return (
    <>
      <Helmet>
        <title>추천 피드 | Shipmate</title>
        <meta
          name="description"
          content="쉽메이트에서 추천하는 게시물을 확인하세요."
        />
        <meta name="keywords" content="추천, 게시물, 쉽메이트, 소통" />
      </Helmet>
      <h1 className="sr-only">추천피드</h1>
      <ul className="flex flex-row flex-wrap gap-x-2 gap-y-3 px-[0.69rem] pb-[1.94rem] pt-[0.75rem]">
        {data.map((item: any) => (
          <SquarePostingCard key={item.id} data={item} />
        ))}
      </ul>
    </>
  );
};

export default RecommendFeed;
