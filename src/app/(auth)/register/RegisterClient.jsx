'use client';

import Loader from '@/components/loader/Loader';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from '../login/Auth.module.scss';
import Image from 'next/image';
import Input from '@/components/input/Input';
import Link from 'next/link';
import Button from '@/components/button/Button';
import Divider from '@/components/divider/Divider';
import LogoPath from '@/assets/colorful.svg';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
const RegisterClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
      } else if (value !== passwordConfirm) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다.');
      } else {
        setError('');
      }
    }
    if (name === 'cPassword') {
      setCPassword(value);
      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상 입력해주세요.');
      } else if (value !== password) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다.');
      } else {
        setError('');
      }
    }
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      return toast.error('비밀번호가 일치하지 않습니다.');
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log(userCredential);

        toast.success('회원가입이 완료되었습니다.');
        router.push('/login');
      })
      .catch((err) => {
        setIsLoading(false);
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
          <form className={styles.form} onSubmit={registerUser}>
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

            <Input
              password
              icon="lock"
              id="cPassword"
              name="cPassword"
              label="비밀먼호 확인"
              placeholder="비밀번호 확인"
              className={styles.control}
              value={cPassword}
              onChange={onChangeInputValidate}
            />

            {error && <p className={styles.validateError}>{error}</p>}

            <div className={styles.buttonGroup}>
              {/* Button */}
              <Button type="submit" width="100%" disabled={error?.length > 0}>
                회원가입
              </Button>
              <Divider />
              <Link href={'/login'}>
                <Button width="100%" secondary>
                  로그인
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterClient;
