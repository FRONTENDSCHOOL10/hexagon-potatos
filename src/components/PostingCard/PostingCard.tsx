import DefaultProfileSVG from '../DefaultProfileSVG/DefaultProfileSVG';
import LabelList from '../Label/LabelList';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';

interface PropTypes {
  profileImg?: string;
  user: string;
  postingImg?: string;
  content: string;
  label?: string[];
  party?: boolean;
  data: {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    photo: string[];
  };
}

const url = `${pb.baseUrl}`;

const PostingCard = ({
  profileImg,
  user,
  postingImg,
  content,
  label,
  data,
  party,
}: PropTypes) => {
  const defaultTipImage = '/assets/shipmatelogo.webp'; // 기본 팁 이미지 URL
  const formatContent = (content: string) => {
    return content.replace(/<br\s*\/?>/gi, '\n');
  };
  return (
    <article className="mx-auto h-auto w-[21rem] justify-between rounded-[0.9375rem] bg-[#FFF] shadow-shadow-blue">
      <header className="flex h-12 flex-row items-center justify-between p-3">
        <div className="pretendard flex h-[1.5rem] items-center gap-[0.5rem] overflow-ellipsis text-center text-xs font-normal not-italic text-black">
          {/* 프로필 사진 있는지 없는지에 따라 기본프로필 띄울지 조건 처리 */}
          {profileImg ? (
            <img
              className="h-6 w-6 overflow-hidden rounded-full"
              src={profileImg}
              alt={`${user}님의 프로필`}
            />
          ) : (
            <DefaultProfileSVG size={24} />
          )}
          <span aria-label="닉네임">{user}</span>
        </div>

        {/* 더보기 버튼 */}
        <button type="button" className="flex w-4 justify-end">
          <svg
            role="img"
            className="h-[1rem] w-[0.16669rem] text-gray-200"
            aria-label="더보기"
          >
            <use href="/assets/sprite-sheet.svg#3dot" />
          </svg>
        </button>
      </header>

      <figure className="h-[20.99rem] bg-slate-200">
        {Array.isArray(postingImg) && postingImg.length > 0 ? (
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="h-full w-full"
          >
            {postingImg.map((img, index) => (
              <SwiperSlide key={index}>
                {party === true ? (
                  <img
                    src={
                      getPbImagesURL(index, data, 'item_photo') ||
                      defaultTipImage
                    }
                    alt={`포스팅 이미지 ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <img
                    src={getPbImagesURL(index, data) || defaultTipImage}
                    alt={`포스팅 이미지 ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={defaultTipImage}
            alt="포스팅 이미지"
            className="h-full w-full object-cover object-center"
          />
        )}
      </figure>

      <footer className="flex h-auto flex-col justify-between gap-0.5 px-3 pb-0.5 pt-3">
        <p className="text-body-1 leading-[1.18rem] text-black">
          {formatContent(content)}
        </p>
        <LabelList data={label} />
      </footer>
    </article>
  );
};

export default PostingCard;
