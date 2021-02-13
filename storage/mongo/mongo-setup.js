db.createUser({
  user: "test_user",
  pwd: "123456",
  roles: [
    {
      role: "read",
      db: "moderncvapp",
    },
  ],
});

db.createCollection("data");

db.data.insertOne({
  basics: {
    name: "Daniel William Clarke",
    label: "Software Engineer",
    email: "clarkit@gmail.com",
    phone: "07411259330",
    website: "https://www.danielwilliamclarke.com",
    summary:
      "*I enjoy building software as I see both the art and science that it requires. I find it very enjoyable to see how a particular project or problem captivates me.*\n\nI am a engaged and quality focused full stack software engineer.\n\nI am always seeking to grasp bleeding edge technologies and practices in cloud, microservice architecture. software development, cyber security, CI/CD, SOLID and TDD.\n\nI am currently leading a team of 4 software engineers, though I never thought that management would be something I would venture into, I am enjoying the challenge, and looking forward to the oppurtunities this role may yield!",
    location: {
      city: "Crawley",
      region: "West Sussex",
      countryCode: "GB",
    },
    profiles: [
      {
        network: "Linkedin",
        username: "danielclarkesoftwareengineer",
        url: "https://www.linkedin.com/in/danielclarkesoftwareengineer/",
      },
      {
        network: "Github",
        username: "DanielWilliamClarke",
        url: "https://github.com/DanielWilliamClarke",
      },
    ],
  },
  work: [
    {
      company: "Schlumberger",
      position: "Drilling and Monitoring Software Engineer Intern",
      website: "https://slb.com/",
      startDate: "01/07/2012",
      endDate: "15/09/2013",
      summary: "Internship...",
      highlights: ["Started the company"],
    },
    {
      company: "Schlumberger",
      position: "Software Engineer",
      website: "https://slb.com/",
      startDate: "14/09/2014",
      endDate: "01/01/2019",
      summary: "Software Engineer!!...",
      highlights: ["Rejoined the company"],
    },
    {
      company: "Schlumberger",
      position: "Full Stack Software Engineer: Zenith",
      website: "https://slb.com/",
      startDate: "01/01/2019",
      endDate: "20/11/2020",
      summary: "Working within a Cloud Infrastructure Team for Seismic / Subsurface Exploration Oil and Gas projects. Using a polyglot technology stack to build solutions for critical workstreams that included; building and maintaining microservies to bridge the gap between next gen and legacy platforms, as well as building infrastructure providing our clients access to powerful seismic interpretation machine learning.",
      highlights: ["Infrastructure", "Platform Integration", "Cloud"],
    },
    {
      company: "Schlumberger",
      position: "Full Stack Software Engineer: GAIA Core",
      website: "https://slb.com/",
      startDate: "20/11/2020",
      endDate: "Present",
      summary: "Full stack software engineer leading a team of 4 software engineers for the GAIA platform.",
      highlights: ["Full Stack Development", "High Visiblity", "Data Integration and Visualisation"],
    },
  ],
  education: [
    {
      institution: "The Nottingham Trent University",
      area: "Computer Science",
      studyType: "Bachelor",
      startDate: "20/09/2010",
      endDate: "20/05/2014",
      gpa: "First Class",
      courses: ["DB1101 - Basic SQL"],
    },
  ],
  skills: {
    programming: [
      "Golang",
      "C++",
      "TypeScript",
      "Node JS",
      "Python",
      "PHP"
    ],
    frameworks: [
      "React",
      "Angular",
      "KnockoutJS",
      "THREEJS"
    ],
    tools: [
      "NPM",
      "Webpack",
      "Grunt",
      "Composer (PHP)",
      "MongoDB",
      "MySQL"
    ],
    software: [
      "Windows",
      "Linux",
      "Docker",
      "Kubernetes",
      "Google Cloud Platform"
    ],
    devtools: [
      "Git",
      "Azure Devops",
      "CircleCI",
      "VS Code",
      "Visual Studio",
      "Jetbrains"
    ]
  },
  languages: [
    {
      language: "English",
      fluency: "Native speaker",
    },
  ],
  interests: [
    "My partner and I have recently had our first child, so being the **best dad I can be** is my foremost interest",
    "I love to play **Magic the Gathering**",
    "**Cooking** new and intesting meals for my Family and I",
    "Learning how to not suck at **Guitar**",
    "**Developing** my own indie games in my spare time",
  ],
});
