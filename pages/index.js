//jshint esversion:6

import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import {fileProcess} from "../utility/file.js";
import Link from 'next/link';


export async function getStaticProps() {
   const postData=fileProcess();
   return {
     props: {
       postData,
     }
   };
}

export default function Home({postData}) {
  console.log(postData);
return (
 <Layout home>
   <Head>
     <title>{siteTitle}</title>
   </Head>
   <section className={utilStyles.headingMd}>
     <p>Hey !! I am Garv and I am building this project to learn about next.js</p>
   </section>

   <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {postData.map(({ val, date, title }) => (
          <li className={utilStyles.listItem} key={val}>
          <Link href={`/posts/${val}`}><a>{title}</a></Link>
            <br />
            {val}
            <br />
            {date}
          </li>
        ))}
      </ul>
    </section>
 </Layout>
);
}
