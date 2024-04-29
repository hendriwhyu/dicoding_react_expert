import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import PopularTags from '../components/PopularTags';
import FormButton from '../components/FormButton';
import {
  asyncToggleDislikeThread,
  asyncToggleLikeThread,
  asyncToggleNeutralThread,
} from '../states/threads/thunk';
import { asyncPopulateUsersAndThreads } from '../states/shared/thunk';
import { clearCategories, setCategories } from '../states/category/slice';

function ThreadPage() {
  const {
    threads = [],
    users = [],
    categories = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLike = (id) => {
    dispatch(asyncToggleLikeThread(id));
  };

  const onDislike = (id) => {
    dispatch(asyncToggleDislikeThread(id));
  };

  const onNeutralLike = (id) => {
    dispatch(asyncToggleNeutralThread(id));
  };

  const onClickTag = (tags) => {
    dispatch(setCategories({ categories: tags }));
  };

  const onUnclickTag = () => {
    dispatch(clearCategories());
  };

  const threadList = threads?.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const threadListSortByTag = threadList
    ?.filter((thread) => thread.category.includes(categories?.selectedCategory))
    .map((thread) => thread);

  return (
    <section className="homepage pt-16 flex flex-col h-full overflow-hidden">
      <div className="w-full p-6 m-auto lg:max-w-xl">
        <PopularTags
          clickTag={onClickTag}
          unclickTag={onUnclickTag}
          tags={categories}
        />
        <h1 className="text-xl font-semibold text-left text-black">
          Diskusi Tersedia
        </h1>
        <ThreadsList
          threads={
            categories?.selectedCategory ? threadListSortByTag : threadList
          }
          like={onLike}
          dislike={onDislike}
          neutralLike={onNeutralLike}
        />
      </div>
      {authUser && <FormButton />}
    </section>
  );
}

export default ThreadPage;
