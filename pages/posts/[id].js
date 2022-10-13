//jshint esversion:6
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Layout from "../../components/Layout.js";
import utilStyles from '../../styles/utils.module.css';
import {fileId,getPostData} from "../../utility/file.js";



export default function Post({postData}) {
  console.log(postData);
  return (

    <Layout>
     <Head>
       <title>{postData.title}</title>
     </Head>
     <article>
       <h1 className={utilStyles.headingXl}>{postData.title}</h1>
       <div className={utilStyles.lightText}>
         {postData.date}
       </div>
       <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
     </article>
   </Layout>



  );
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}


export async function getStaticPaths() {
   const paths=fileId();
   return {
     paths,
     fallback:false
   }
}


/*function About() {
  return (
   <Layout>
    <Head>
       <title>First Post</title>
    </Head>
    <Script
      src="https://connect.facebook.net/en_US/sdk.js"
      onLoad={
            () => console.log("the script had been loaded")

      }
      strategy="lazyonload"
    />
    <h1>First post</h1>
     </Layout>

  )
}
export default About;*/
