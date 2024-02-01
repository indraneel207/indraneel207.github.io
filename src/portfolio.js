/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/Welcome_logo.json"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Indraneel Vairagare",
  title: "Hey, I'm Indraneel",
  subTitle: emoji(
    "I'm a CS grad at ASU 🔱 and proudly rock the Sun Devil vibe. Tech enthusiast, coding ninja, and full-stack developer with over 3 years of professional mischief. I geek out on AI & ML, love solving problems, and believe in the magic of code. Let's build something awesome together!"
  ),
  resumeLink:
    "https://drive.google.com/file/d/1ofFdKF_mqscH8WvXkSObnVvC9kK7Ldlu/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/indraneel207",
  linkedin: "https://www.linkedin.com/in/indraneelvairagare/",
  gmail: "indraneel207@gmail.com",
  instagram: "https://www.instagram.com/indraneel_vairagare_/",
  facebook: "https://www.facebook.com/indraneel.vairagare/",
  // leetcode: "https://leetcode.com/indraneel207/",
  twitter: "https://twitter.com/indraneel207",
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "Crafting Awesome Tech Experiences!",
  skills: [
    emoji("🎨 Crafting dazzling user interfaces and seamless experiences."),
    emoji(
      "🚀 Ensuring peak performance on the back-end and orchestrating cloud magic."
    ),
    emoji(
      "🔍 Navigating data realms and turning information into actionable insights."
    ),
    emoji(
      "🧙‍♂️ Delving into Applied ML and Data Science to create intelligent solutions."
    ),
    emoji(
      "🎉 Leading projects with expertise in Web Services, APIs, Agile, and Scrum."
    ),
    emoji(
      "🏰 Securing the kingdom through design patterns and meticulous documentation."
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "HTML-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "VueJS",
      fontAwesomeClassname: "fab fa-vuejs"
    },
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "MongoDB",
      fontAwesomeClassname: "fas fa-server"
    },
    {
      skillName: "TensorFlow",
      fontAwesomeClassname: "fas fa-laptop-code"
    },
    {
      skillName: "OpenCV",
      fontAwesomeClassname: "fas fa-film"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "git",
      fontAwesomeClassname: "fab fa-git"
    },
    {
      skillName: "Design Patterns",
      fontAwesomeClassname: "fas fa-hashtag"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Arizona State University",
      logo: require("./assets/images/Arizona_State_University_seal.png"),
      subHeader: "Master of Science in Computer Science(MSCS)",
      duration: "August 2022 - May 2024",
      desc: "Pursued an advanced CS degree, diving into a mix of cool projects exploring cutting-edge tech and solving problems in creative ways.",
      descBullets: [
        "Rocked courses like Artificial Intelligence, Data Mining, Cloud Computing, and a bunch more.",
        "Kept the grades game strong, pulling off multiple A+ scores and an awesome CGPA of 3.9.",
        "Did the TA gig for courses CSE 110 and CSE 205, rolling with Prof. Ryan Meuth.",
        "Juggled being a lively member of both the Google Developers Club and the IEEE Club at ASU."
      ]
    },
    {
      schoolName: "Jawaharlal Nehru Technological University, Hyderabad, India",
      logo: require("./assets/images/JNTU_Hyderabad_logo.png"),
      subHeader:
        "Bachelor of Technology in Computer Science & Engineering(B.Tech CSE)",
      duration: "August 2016 - September 2020",
      desc: "Graduated in the top 10% of the pack from the prestigious CMR College of Engineering & Technology (CMRCET).",
      descBullets: [
        "Dived into courses like C Programming, Data Structures & Algorithms, Software Engineering, Web Security, and Operating Systems.",
        "Nailed it with a killer GPA of 9.23/10, snagging that sweet Merit recognition.",
        "Teamed up with the College Principal to guide buddies, boosting coding skills all the way.",
        "Wore the hat of President at the Events Management Club, cooking up some seriously cool activities."
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "70%"
    },
    {
      Stack: "Programming",
      progressPercentage: "60%"
    }
  ],
  displayCodersrank: true // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "SDE2 / Team Lead",
      company: "actyv.ai",
      companylogo: require("./assets/images/actyv_logo.png"),
      date: "Apr 2022 – Jul 2022",
      desc: "(Software Ninja & Team Leader)",
      descBullets: [
        "Led a crew of 6 rockstars to build kick-ass full stack web apps from scratch.",
        "Architected 70% of a new project's backend, making it faster, stronger, and more secure than ever.",
        "Leveled up application security, slashed potential threats by 80%, and scored the team some SOC 2 and ISO 27001 certifications."
      ]
    },
    {
      role: "SDE1",
      company: "actyv.ai",
      companylogo: require("./assets/images/actyv_logo.png"),
      date: "Jun 2021 – Mar 2022",
      desc: "(Code Wizard & SaaS Sorcerer)",
      descBullets: [
        "Magically transformed the 'Onboarding & Admin Portal' into SaaS goodness loved by 10 top FMCG companies.",
        "Made user onboarding a breeze by throwing in document parsers, KYC services, 3rd party bank APIs, and a custom e-sign service. Result? 100% virtual and paper-free onboarding, saving around $100,000.",
        "Guided the team in conjuring a Single Sign-On (SSO) spell to manage RBAC-based user systems across 6 applications."
      ]
    },
    {
      role: "Assoc. SDE",
      company: "actyv.ai",
      companylogo: require("./assets/images/actyv_logo.png"),
      date: "Jul 2020 – May 2021",
      desc: "(Coding Sorcerer's Apprentice)",
      descBullets: [
        "Solved the 'Delegation of user requests' puzzle, seamlessly integrating it into 2 MERN-based web apps that became the company's pride and joy.",
        "Teamed up to create actyv Score, a DS application predicting creditworthiness with an 80% accuracy charm.",
        "Crafted a fast & efficient 3rd party app add-on for instant data dumps, making network transfers feel like magic (<1.5s)."
      ]
    },
    {
      role: "SDE Intern",
      company: "actyv.ai",
      companylogo: require("./assets/images/actyv_logo.png"),
      date: "Oct 2019 – Jun 2020",
      desc: "(Code Sorcerer in Training)",
      descBullets: [
        "Collaborated on building full-stack web apps & multilingual Android magic for the Neo-Banking sectors.",
        "Dove into Coding standards, Design patterns, and Testing methods, contributing to the magical arts of software engineering on projects like ‘Jandhan’, ‘Actyv Pro’, etc."
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Tech Adventures!",
  subtitle:
    "I've been the secret sauce behind some awesome startups and companies, crafting their tech dreams into reality!",
  projects: [
    {
      image: require("./assets/images/onboarding_portal.png"),
      projectName: "Streamlined User Onboarding Solution",
      projectDesc:
        "Whipped up a super cool MERN-based user onboarding web app! Made admin reviews a breeze and user interaction as smooth as butter. ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://britannia-onboarding.prod.actyv.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/signature-1.gif"),
      projectName: "Seamless E-Signature Integration System",
      projectDesc:
        "Turned the whole process into a 100% paperless party! 🎉 Added a slick feature for sequential user e-signatures on all kinds of docs—PDFs, Microsoft Docs, you name it! Reached a whopping 1.5K digital autographs!",
      footerLink: []
    },
    {
      image: require("./assets/images/Shrivatsava_labs.png"),
      projectName: "Shrivastava Lab",
      projectDesc:
        "Cooked up a snazzy website for my professor's lab at ASU! Written in NextJS and sizzling hot on AWS. All the magic? Yep, that's all me! ",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://shrivastavalab.com/"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements & Certifications"),
  subtitle:
    "Awesome achievements, certifications, award letters, and some cool stuff that I've nailed! ",

  achievementsCards: [
    {
      title: "Meta Front-End Developer Professional Certificate",
      subtitle:
        "Mastered building responsive websites with HTML, CSS, and JavaScript, delved into React, aced Bootstrap, and even prepped for coding interviews!",
      image: require("./assets/images/Meta-logo.png"),
      imageAlt: "Meta Front-End Developer",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.coursera.org/account/accomplishments/specialization/certificate/UZQQY25RFTPM"
        }
      ]
    },
    {
      title: "IBM Data Science Professional Certificate",
      subtitle:
        "Dived into the data science realm, mastering Python, SQL, and crafting real-world projects to showcase my wizardry to employers.",
      image: require("./assets/images/IBM_logo.jpg"),
      imageAlt: "IBM Data Science",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.coursera.org/account/accomplishments/specialization/certificate/MNDDL5TGPXWU"
        }
      ]
    },
    {
      title: "Foundational C# with Microsoft Certification",
      subtitle:
        "Mastered C# like a coding ninja – from dynamic web apps to Unity games, I'm armed with skills and a badass certification to prove it!",
      image: require("./assets/images/Microsoft_log.png"),
      imageAlt: "Microsoft Certification",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.freecodecamp.org/certification/indraneel_vairagare/foundational-c-sharp-with-microsoft"
        }
      ]
    },
    {
      title: "AWS Fundamentals: Going Cloud-Native",
      subtitle:
        "Mastering AWS essentials and unleashing the power of cloud magic for IT professionals!",
      image: require("./assets/images/aws_logo.png"),
      imageAlt: "AWS Fundamentals",
      footerLink: [
        {
          name: "View Certificate",
          url: "https://www.coursera.org/account/accomplishments/certificate/E9H8JC7THTCP"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [""],
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "Not so fast, I'm not sharing my number here 😜",
  email_address: "indraneel207@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable
};
