db.createUser(
  {
    user: "test_user",
    pwd: "123456",
    roles: [
      {
        role: "read",
        db: "moderncvapp"
      }
    ]
  })

db.createCollection("data")

db.data.insertOne({
  basics: {
    name: "Daniel William Clarke",
    label: "Full Stack Software Engineer",
    picture: "/assets/headshot.jpg",
    email: "clarkit@gmail.com",
    phone: "07123456789",
    website: "https://www.danielwilliamclarke.com",
    summary: "Software Engineer trying to become the very best, like no one ever was!",
    location: {
      address: "101 street road",
      postalCode: "post code",
      city: "Crawsley",
      countryCode: "GB",
      region: "us-central1-c"
    },
    profiles: [
      {
        network: "Linkedin",
        username: "danielclarkesoftwareengineer",
        url: "https://www.linkedin.com/in/danielclarkesoftwareengineer/"
      },
      {
        network: "Github",
        username: "DanielWilliamClarke",
        url: "https://github.com/DanielWilliamClarke"
      }
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
      highlights: [
        "Started the company"
      ]
    },
    {
      company: "Schlumberger",
      position: "Software Engineer",
      website: "https://slb.com/",
      startDate: "14/09/2014",
      endDate: "01/01/2019",
      summary: "Software Engineer!!...",
      highlights: [
        "Rejoined the company"
      ]
    },
    {
      company: "Schlumberger",
      position: "Full Stack Software Engineer",
      website: "https://slb.com/",
      startDate: "01/01/2019",
      endDate: "Present",
      summary: "Full Stack Software Engineer!!...",
      highlights: [
        "Changed Roles"
      ]
    }
  ],
  education: [
    {
      institution: "The Nottingham Trent University",
      area: "Computer Science",
      studyType: "Bachelor",
      startDate: "20/09/2010",
      endDate: "20/05/2014",
      gpa: "First Class",
      courses: [
        "DB1101 - Basic SQL"
      ]
    }
  ],
  skills: [
    {
      name: "Programming Languages",
      level: "Advanced",
      keywords: [
        "Golang",
        "C++",
        "C",
        "JavaScript ES6+",
        "TypeScript",
        "Python",
        "PHP",
        "Powershell",
        "Bash",
        "Matlab / Simulink",
        "HTML5",
        "CSS",
        "Sass",
      ]
    },
    {
      name: "Technologies",
      level: "Advanced",
      keywords: [
        "Windows",
        "Linux",
        "Google Cloud Platform",
        "Docker",
        "Kubernetes",
        "Seleium Webdriver",
        "NodeJS / NPM ",
        "Composer (PHP)",
        "React",
        "KnockoutJS",
        "RequireJS",
        "THREEJS / WebGL",
        "GruntJS",
        "Webpack",
      ]
    },
    {
      name: "Test Frameworks",
      level: "Advanced",
      keywords: [
        "Go test",
        "Mocha",
        "Karma",
        "Jasmine",
        "Google Test / Mock",
        "Microsoft Unit Testing Framework For C++",
      ]
    },
    {
      name: "Development Tools",
      level: "Advanced",
      keywords: [
        "VSCode",
        "Visual Studio",
        "Jetbrains PHPStorm",
        "Git",
        "Azure Devops",
        "CircleCI",
      ]
    }
  ],
  languages: [
    {
      language: "English",
      fluency: "Native speaker"
    }
  ],
  interests: [
    {
      name: "Living my best life",
      keywords: [
        "My partner and I have recently had our first child, so being the best dad I can is my foremost interest",
        "Magic the Gathering",
        "Home Automation",
        "Virtual Reality.",
        "Cooking",
        "Guitar",
        "Cycling",
        "Retro Games",
        "Gardening",
        "Reading and Audiobooks",
      ]
    }
  ]
})