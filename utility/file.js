//jshint esversion:9
//the task in hand is to parse the file data and extract information
//lis the data on the index page by sorting it through date
const fs=require('fs');
const path=require('path');
const matter=require('gray-matter');
import { remark } from 'remark';
import html from 'remark-html';

const wd=path.join(process.cwd(),'posts');

export function fileProcess() {
   let files=fs.readdirSync(wd);
   const postData=files.map((val) => {
     const fileData=fs.readFileSync(`${wd}/${val}`,'utf-8');
     const matterResult=matter(fileData);
     val=val.replace(/\.md$/, '');
     return {
       val,
       ...matterResult.data
     };
   });
   return postData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}


export function fileId() {
  let files=fs.readdirSync(wd);
  const postId=files.map((val) => {

    return {
      params: {
        id:val.replace(/\.md$/, ''),
      }
    };
  });
  return postId;
}


export function getPostData(id) {
  const fullPath = path.join(wd, `/${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id


 // Use remark to convert markdown into HTML string
  /*const processedContent =await remark()
  .use(html).process(matterResult.content);
 const contentHtml = processedContent.toString();*/
 const contentHtml=matterResult.content;
  return {
    id,
    contentHtml,
    ...matterResult.data,

  };
}
