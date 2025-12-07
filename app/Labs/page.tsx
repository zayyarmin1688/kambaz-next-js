import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
     <h1>Labs</h1>
     <ul>
      <h2> Zay Yar Min CS4550.11597.202610 </h2>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
       <li>
        <Link href="/Labs/Lab4" id="wd-lab4-link">
          Lab 4: React Events, State & Redux
        </Link>
      </li>
      <li>
        <Link href="/Labs/Lab5" id="wd-lab5-link">
          Lab 5: Node HTTP Server & Environment Variables
        </Link>
      </li>
       <li>
        <Link href="/" id="wd-kambaz-link">
        Kambaz</Link>
        </li>
        <li>
          <a
            href="https://github.com/zayyarmin1688/kambaz-next-js"
            id="wd-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
     </ul>
   </div>
);}
