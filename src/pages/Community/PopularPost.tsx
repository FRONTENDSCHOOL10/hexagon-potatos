import PostingCard from '@/components/PostingCard/PostingCard';
import useFetch from '@/hooks/useFetch';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import { Helmet } from 'react-helmet-async';

const PopularPost = () => {
  const defaultTipImage = '/assets/shipmatelogo.png'; // 기본 팁 이미지 URL
  const ENDPOINT = `${import.meta.env.VITE_PB_URL}`;
  const postingUrl = `${ENDPOINT}api/collections/posting/records`;

  const { data, error, status } = useFetch(postingUrl, 'author_id');
  const PostData = data?.items;

  return (
    <section className="mt-3 flex flex-col gap-3">
      <Helmet>
        <title>인기 게시물 | Shipmate</title>
        <meta
          name="description"
          content="현재 인기 있는 게시물을 확인해보세요."
        />
        <meta name="keywords" content="인기 게시물, 게시판, 쉽메이트" />
      </Helmet>
      {PostData?.map((d: any, index: number) => (
        <PostingCard
          key={d.id}
          profileImg={
            d?.expand?.author_id?.profile_photo
              ? getPbImageURL(ENDPOINT, d?.expand?.author_id, 'profile_photo')
              : ''
          }
          user={d.expand.author_id.nickname}
          postingImg={d.photo}
          content={d.content}
          label={d.tag}
          data={d}
        />
      ))}
    </section>
  );
};

export default PopularPost;
