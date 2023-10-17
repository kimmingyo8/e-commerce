'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import LogoPath from '@/assets/colorful.svg';
import { useRouter } from 'next/navigation';

import styles from './Auth.module.scss';
import Loader from '@/components/loader/Loader';
import Input from '@/components/input/Input';
import AutoSignInCheckbox from '@/components/autoSignInCheckbox/AutoSignInCheckbox';
import Divider from '@/components/divider/Divider';
import Button from '@/components/button/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const LoginClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push('/');
  };

  const onChangeInputValidate = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!validRegex.test(value)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }
    if (name === 'password') {
      setPassword(value);
      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상 입력해주세요.');
      } else {
        setError('');
      }
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast.success('로그인에 성공하였습니다.');
        redirectUser();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('로그인에 성공하였습니다.');
        redirectUser();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image priority src={LogoPath} alt="로고" />
          </h1>
          <form className={styles.form} onSubmit={loginUser}>
            {/* input */}
            <Input
              email
              icon="letter"
              id="email"
              name="email"
              label="이메일"
              placeholder="아이디(이메일)"
              className={styles.control}
              value={email}
              onChange={onChangeInputValidate}
            />
            <Input
              password
              icon="lock"
              id="password"
              name="password"
              label="비밀먼호"
              placeholder="비밀번호"
              className={styles.control}
              value={password}
              onChange={onChangeInputValidate}
            />
            {error && <p className={styles.validateError}>{error}</p>}
            <div className={styles.group}>
              {/* 자동 로그인, 비밀번호 수정 */}
              <AutoSignInCheckbox
                checked={isAutoLogin}
                onChange={(e) => setIsAutoLogin(e.target.checked)}
              />
              <Link href={'/reset'} className={styles.findLink}>
                비밀번호 수정하기
                <svg
                  width="11"
                  height="18"
                  viewBox="0 0 11 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.findLinkArrow}
                >
                  <path
                    d="M1.5 1L9.5 9L1.5 17"
                    stroke="#0074E9"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            </div>
            <div className={styles.buttonGroup}>
              {/* Button */}
              <Button type="submit" width="100%" disabled={error?.length > 0}>
                로그인
              </Button>
              <Divider />
              <Link href={'/register'}>
                <Button width="100%" secondary>
                  회원가입
                </Button>
              </Link>

              <Divider />
              <div>
                {/* Button */}
                <Button onClick={signInWithGoogle}>구글 로그인</Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
