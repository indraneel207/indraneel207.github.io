export const profile = {
  name: "Indraneel Vairagare",
  firstName: "Indraneel",
  role: "Software Engineer",
  location: "Pennsylvania, USA",
  email: "indraneel207@gmail.com",
  github: "https://github.com/indraneel207",
  linkedin: "https://www.linkedin.com/in/indraneelvairagare/",
  resume:
    "https://drive.google.com/file/d/1ZlKcvBtlRJns4-DQW23A-u9UUzI_OImy/view",
  introduction:
    "Hey, I’m Indraneel. I build financial technology platforms at Vanguard and open-source research software, connecting thoughtful interfaces, cloud systems, and applied computer vision.",
  biography: [
    "I’m a software engineer at Vanguard with an MS in Computer Science from Arizona State University. I build internal financial platforms, shared frontend foundations, and the cloud workflows behind them.",
    "My work also includes RABiTPy, an open-source computer-vision tool for researchers. I like turning complex systems and data into clear, useful software — whether that means a product interface, a Python package, or an AI prototype."
  ],
  description:
    "Software engineer at Vanguard building financial platforms and open-source research software. Explore platform engineering, RABiTPy, and applied AI projects."
};

export const research = {
  title: "RABiTPy",
  journal: "BMC Bioinformatics",
  year: "2025",
  contribution: "Equal-contribution author · Software developer",
  publication: "https://link.springer.com/article/10.1186/s12859-025-06145-w"
};

export const achievement = {
  title: "ACM-ICPC Amritapuri regional finalist",
  year: "2017",
  source: profile.linkedin
};

export const community = [
  {
    role: "Volunteer",
    organization: "National Service Scheme",
    period: "2018–2019"
  },
  {
    role: "Campus Coordinator",
    organization: "Street Cause",
    period: "2017–2018"
  }
];

export const recommendations = [
  {
    author: "Raghu Venkat",
    authorUrl: "https://www.linkedin.com/in/raghuvenkat2018/",
    relationship: "Direct manager at the time",
    date: "2022-08-08",
    focus: "Problem solving & mentorship",
    excerpt: "At work he is a natural coder as well as a mentor.",
    quote:
      "I recruited Neel from his college campus, so I have the privilege of working with him from day 1. So going back to day 0, Neel impressed me with his enthusiasm and intelligence. The campus interview questions were not your typical leetcode or geek to geek type questions. Neel had to apply practical concepts to the theory behind DataStructures and Algorithms - he aced it - both from the running complexity as well as the space complexity. He was able to relate to business problems. At work he is a natural coder as well as a mentor. He learnt how to break down a complex problem into simple tasks - he integrated e-sign and e-stamp, worked on complex GST returns and created beautiful looking dashboards using React. He is adept at MERN stack among other things. He gave a wonderful bookclub - Math for Programmers - this is a classic example of going above and beyond. He made the presentation so captivating, He has done numerous tech sessions and helped groom/hire mentors. In short Neel is a sharp and intelligent person, capable of executing any task in the software world"
  },
  {
    author: "Shubham Verma",
    authorUrl: "https://www.linkedin.com/in/shubhamverma/",
    relationship: "Senior colleague at the time",
    date: "2022-09-16",
    focus: "Ownership & initiative",
    excerpt:
      "Indraneel has never shied away from going above and beyond his defined set of responsibilities, and has consistently owned it and set an example for others to follow.",
    quote:
      "Indraneel has never shied away from going above and beyond his defined set of responsibilities, and has consistently owned it and set an example for others to follow. He is a bliss to work with and always brings his best self to work."
  },
  {
    author: "Himanshu Mittal",
    authorUrl: "https://www.linkedin.com/in/mittal-himanshu/",
    relationship: "Senior colleague at the time",
    date: "2022-10-25",
    focus: "Curiosity & collaboration",
    excerpt:
      "His passion towards new technologies and market trends is very inspiring. He is always willing to share his learnings and makes the work a very collaborative experience.",
    quote:
      "He brings his best to the work and makes it a fun place to be. His passion towards new technologies and market trends is very inspiring. He is always willing to share his learnings and makes the work a very collaborative experience. I wish you the best and many more successes in your career."
  }
];

export const experience = [
  {
    company: "Vanguard",
    role: "Software Engineer",
    period: "Oct 2024 — Present",
    location: "Malvern, Pennsylvania",
    description:
      "Building internal financial technology platforms across React/TypeScript micro-frontends, frontend infrastructure, shared libraries, testing automation, and AWS workflow orchestration.",
    highlights: [
      "Own and deliver multiple React + TypeScript micro-frontends, from architecture, state management, and API integration to testing, CI/CD, and deployment.",
      "Build Module Federation patterns, shared singleton dependencies, and reusable authentication and authorization libraries for use across engineering teams.",
      "Automate AWS Step Functions workflows with CloudFormation, Glue, S3, and DynamoDB, saving 10+ hours of manual work each week.",
      "Improve engineering quality through Cypress BDD, Vitest, E2E testing, CI/CD, documentation, and reusable examples adopted across 6 teams.",
      "Use Claude-powered agentic workflows and prompt engineering to accelerate development, code review, refactoring, and test creation by 40%."
    ],
    tags: [
      "React + TypeScript",
      "Micro-frontends",
      "Platform engineering",
      "AWS"
    ]
  },
  {
    company: "actyv.ai",
    role: "SDE Intern → SDE 2 / Team Lead",
    period: "Oct 2019 — Jul 2022",
    location: "Bangalore, India",
    description:
      "Grew from intern to team lead while building full-stack products for onboarding, identity, and business workflows.",
    highlights: [
      "Led a six-person engineering team and contributed to backend architecture.",
      "Built onboarding and admin tools integrating document parsing, KYC, banking APIs, and e-signatures.",
      "Contributed to shared sign-on and role-based access across applications."
    ],
    tags: ["MERN", "Product engineering", "Leadership"],
    progression: [
      {role: "SDE 2 / Team Lead", dates: "Apr 2022 — Jul 2022"},
      {role: "SDE 1", dates: "Jun 2021 — Mar 2022"},
      {role: "Associate SDE", dates: "Jul 2020 — May 2021"},
      {role: "SDE Intern", dates: "Oct 2019 — Jun 2020"}
    ]
  },
  {
    company: "Xebia",
    role: "Developer Trainee",
    period: "Jul 2019 — Sep 2019",
    location: "Hyderabad, India",
    description:
      "Built a foundation in Java, Spring MVC, REST APIs, and relational databases through hands-on application development.",
    highlights: [],
    tags: ["Java", "Spring", "PostgreSQL"]
  }
];

export const capabilities = [
  {
    number: "01",
    title: "Interfaces that make sense.",
    description:
      "Turning complex requirements into clear, responsive product experiences.",
    tools: "React · TypeScript · Module Federation · Cypress · Vitest"
  },
  {
    number: "02",
    title: "Systems that connect.",
    description:
      "Connecting the interface to APIs, reliable workflows, and the cloud.",
    tools: "Node.js · REST · AWS · SQL · MongoDB · Docker"
  },
  {
    number: "03",
    title: "Research, made usable.",
    description:
      "Building computer-vision tools for researchers and connecting predictive models to product experiences.",
    tools: "Python · Computer vision · Flask · scikit-learn · pandas"
  }
];

export const experiments = [
  {
    number: "01",
    title: "Signals in the noise",
    category: "JavaScript / Data exploration",
    description:
      "The front end of a project exploring directional stock prediction using viral tweets and news.",
    url: "https://github.com/indraneel207/Directional_Stock_Prediction_using_Viral_Tweets_News---front_end",
    repo: "Directional_Stock_Prediction_using_Viral_Tweets_News---front_end"
  }
];

export const credentials = [
  {
    title: "Meta Front-End Developer",
    issuer: "Professional certificate",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/UZQQY25RFTPM"
  },
  {
    title: "IBM Data Science",
    issuer: "Professional certificate",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/MNDDL5TGPXWU"
  },
  {
    title: "AWS Fundamentals",
    issuer: "Going Cloud-Native",
    url: "https://www.coursera.org/account/accomplishments/certificate/E9H8JC7THTCP"
  },
  {
    title: "Foundational C# with Microsoft",
    issuer: "freeCodeCamp certification",
    url: "https://www.freecodecamp.org/certification/indraneel_vairagare/foundational-c-sharp-with-microsoft"
  }
];
