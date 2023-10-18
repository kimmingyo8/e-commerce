'use client';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import InnerHeader from '../innerHeader/InnerHeader';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 구글 로그인(displayName 있음) vs 일반 로그인(displayName 없음)
        if (user.displayName === null) {
          const ul = user.email.substring(0, user.email.indexOf('@'));
          const uName = ul.charAt(0).toUpperCase() + ul.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        // TODO: user 정보를 리덕스 스토어에 저장
      } else {
        setDisplayName('');
        // TODO: user 정보를 리덕스 스토어에서 지움
      }
    });
  }, []);

  // Header함수 렌더링 조건
  if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/reset'
  ) {
    return null;
  }

  const logoutUser = (e) => {
    signOut(auth)
      .then(() => {
        toast.success('로그아웃 되었습니다.');
        router.push('/');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href={'/login'}>로그인</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/admin/dashboard'}>관리자</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/order-history'}>주문목록</Link>
          </li>
          <li className={styles.item} onClick={logoutUser}>
            <Link href={'/'}>로그아웃</Link>
          </li>
          <li className={styles.item} onClick={logoutUser}>
            <Link href={'/'}>제휴 마케팅</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/'}>쿠팡 플레이</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/'}>고객센터</Link>
          </li>
        </ul>
      </div>
      {pathname.startsWith('/admin') ? null : <InnerHeader />}
    </header>
  );
};

export default Header;
