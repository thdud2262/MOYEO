import { useMutation } from '@tanstack/react-query';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Toggle from '../components/Toggle';
import ModalAccordionButton from '../components/common/ModalAccordionButton';
import TopNavBar from '../components/common/TopNavBar';
import useChangePostForm from '../hooks/useChangePostForm';
import { deleteMeeting, editMeeting, postMeeting } from '../services/api';
import { loadItem, saveItem } from '../services/storage';
import { ButtonWrap, DeleteButton, PostButton } from '../styles/ButtonStyle';
import {
  FieldWrap,
  FileLabel,
  FormAlert,
  FormContents,
  FormLabel,
  FormTitle,
  FormWrap,
  InputField,
  TextAreaField,
  TextLength,
  TimeInputField,
} from '../styles/FormStyle';
import { calcStartTime } from '../utils/utils';

export default function PostPage() {
  const { id } = useParams();

  useEffect(() => {
    return () => {
      saveItem('keyword', 'popular');
      saveItem('category', '');
    };
  }, []);

  const tmp = loadItem('currPost');
  const currPost = tmp && JSON.parse(tmp);

  const { postForm, handleChangeInputField } = useChangePostForm();
  const { title, content, link } = postForm;

  const defaultValues =
    id && currPost
      ? currPost
      : {
          title: '',
          category: '',
          startDate: '',
          startTime: '',
          duration: '',
          platform: '',
          link: '',
          content: '',
          maxNum: '',
          secret: false,
          password: '',
          image: null,
        };

  const { handleSubmit, register, control, setValue } = useForm<FieldValues>({
    defaultValues,
  });

  const mutateEditMeeting = useMutation({
    mutationFn: editMeeting,
  });

  const mutatePostMeeting = useMutation({
    mutationFn: postMeeting,
  });

  const mutateDeleteMeeting = useMutation({
    mutationFn: deleteMeeting,
    onSuccess: () => {
      location.assign('/main');
    },
  });

  const onSubmit = (postForm: FieldValues) => {
    id ? mutateEditMeeting.mutate({ id: +id, postForm }) : mutatePostMeeting.mutate(postForm);
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledHours = () => {
    const hours = range(0, 24);
    const availableHours = hours.filter((hour) => hour < new Date().getHours() + 1);
    return availableHours;
  };

  const disabledMinutes = () => {
    const mins = [0, 10, 20, 30, 40, 50];
    const availableMins = mins.filter((min) => min < new Date().getMinutes());
    return availableMins;
  };

  return (
    <>
      <TopNavBar name={'post'} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrap>
          <FormTitle>????????? ?????? ??????????????????!</FormTitle>
          <FormContents>
            <ModalAccordionButton register={register} control={control} name={'category'} />
            <FormAlert>?????? ?????? ?????? ????????? ??????????????? ???????????? ??????????????????!</FormAlert>
            <FormLabel>
              <label htmlFor="title">?????? ??????</label>
              <span>*</span>
            </FormLabel>
            <FieldWrap>
              <InputField
                {...register('title', { required: true })}
                type="text"
                id="title"
                maxLength={20}
                placeholder={currPost ? currPost.title : '?????? ????????? ??????????????????'}
                onChange={(e) => handleChangeInputField(e)}
              />
              <TextLength>
                <span>{`${title.length}/20`}</span>
              </TextLength>
            </FieldWrap>
            <FormLabel>
              <label htmlFor="image">?????? ?????????</label>
            </FormLabel>
            <FileLabel>
              <label htmlFor="image">????????? ?????????</label>
            </FileLabel>
            <InputField {...register('image')} type="file" id="image" accept="image/*" />
            <FormLabel>
              <label htmlFor="content">??????</label>
              <span>*</span>
            </FormLabel>
            <FieldWrap>
              <TextAreaField
                {...register('content', { required: true })}
                id="content"
                maxLength={300}
                placeholder={currPost ? currPost.content : '????????? ????????? ????????? ?????????!'}
                onChange={(e) => handleChangeInputField(e)}
              />
              <TextLength>
                <span>{`${content.length}/300`}</span>
              </TextLength>
            </FieldWrap>
            <ModalAccordionButton register={register} control={control} name={'platform'} />
          </FormContents>

          <FormTitle>????????? ???????????? ?????? ????????????????</FormTitle>
          <FormContents>
            <FormLabel>
              <label htmlFor="link">??????</label>
            </FormLabel>
            <InputField
              {...register('link', { required: false })}
              type="text"
              id="link"
              value={link}
              placeholder={currPost ? currPost.link : '????????? ??????????????????'}
              onChange={(e) => handleChangeInputField(e)}
            />
            <ModalAccordionButton register={register} control={control} name={'startDate'} />
            <FormLabel>
              <label htmlFor="startTime">?????? ??????</label>
              <span>*</span>
            </FormLabel>
            <Controller
              name="startTime"
              control={control}
              render={({ field: { onChange } }) => (
                <TimeInputField>
                  {id ? (
                    <TimePicker
                      {...register('startTime', { required: true })}
                      format="HH:mm"
                      minuteStep={10}
                      showNow={false}
                      placeholder="????????? ??????????????????"
                      disabledHours={disabledHours}
                      defaultValue={dayjs(defaultValues.startTime, 'HH:mm')}
                      onChange={(value, dateString) => {
                        onChange(calcStartTime(dateString));
                      }}
                    />
                  ) : (
                    <TimePicker
                      {...register('startTime', { required: true })}
                      format="HH:mm"
                      minuteStep={10}
                      showNow={false}
                      placeholder="????????? ??????????????????"
                      disabledHours={disabledHours}
                      disabledMinutes={disabledMinutes}
                      onChange={(value, dateString) => {
                        onChange(calcStartTime(dateString));
                      }}
                    />
                  )}
                </TimeInputField>
              )}
            />
            <ModalAccordionButton register={register} control={control} name={'duration'} />
          </FormContents>

          <FormTitle>????????? ??? ?????? ????????? ????????????????</FormTitle>
          <FormContents>
            <ModalAccordionButton register={register} control={control} name={'maxNum'} />
            <FormAlert>?????? ?????? ?????? ????????? ??????????????? ???????????? ??????????????????!</FormAlert>
            <Toggle
              isSecret={currPost ? currPost.secret : false}
              register={register}
              setValue={setValue}
            />
          </FormContents>
        </FormWrap>

        <ButtonWrap>
          <div>
            <PostButton type="submit">{id ? '????????????' : '????????????'}</PostButton>
            {id && (
              <DeleteButton type="button" onClick={() => mutateDeleteMeeting.mutate({ id: +id })}>
                ?????? ????????????
              </DeleteButton>
            )}
          </div>
        </ButtonWrap>
      </form>
    </>
  );
}
