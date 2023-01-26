import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';

import { makeFollowApi } from '../../services/api';
import { loadItem } from '../../services/storage';
import { FollowStyleButton } from '../../styles/DetailButtonStyle';
import { MemberTypes } from '../../types/DetailTypes';

const FollowButton = ({ userId, followed }: MemberTypes) => {
  const [isFollow, setIsFollow] = useState(followed);
  const myId = Number(loadItem('userId'));

  const useMakeFollow = () => {
    const QueryClient = useQueryClient();
    return useMutation(makeFollowApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries(['follow']);
        setIsFollow(!isFollow);
      },
    });
  };
  const { mutate: makeFollow } = useMakeFollow();
  const handleClickFollow = () => {
    makeFollow({ userId });
  };

  return (
    <>
      {userId == myId ? null : (
        <FollowStyleButton
          BGcolor={isFollow ? '#E9E9E9' : '#9CC8D2'}
          color={isFollow ? '#666666' : '#FFFFFF'}
          fontWeight={isFollow ? '500' : '700'}
          onClick={handleClickFollow}
        >
          {isFollow ? '팔로우취소' : '팔로우'}
        </FollowStyleButton>
      )}
    </>
  );
};

export default FollowButton;
