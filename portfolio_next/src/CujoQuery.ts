import { gql } from "urql";

export const CujoQuery = gql`
query CujoQuery {
  cv {
    about {
      ...About
    }
    work {
      ...Work
    }
    education {
      ...Education
    }
    skills {
      ...Skills
    }
    projects {
      ...Project
    }
    readingList { 
      ...ReadingList
    }
  }
  blog {
    ...Blog
  }
}

fragment About on AboutEntry {
  entry {
    name
    label
    phone
    email
    website
    about
    interests
    images {
      ...ImageUrl
    }
    profiles {
      url
      brand {
        ...DevIcon
      }
    }
  }
  includes
}

fragment Work on WorkEntries {
  entries {
    position
    company
    website
    startDate
    endDate
    highlights
    summary
    logo {
      ...ImageUrl
    }
    images {
      ...ImageUrl
    }
    hideFromCv
  }
  includes
}

fragment Education on EducationEntries {
  entries {
    institution
    link
    area
    studyType
    startDate
    endDate
    grade
    summary
    images {
      ...ImageUrl
    }
  }
  includes
}

fragment Skills on SkillsEntry {
  entry {
    summary
    currentSummary
    current {
      ...Skill
    }
    favoriteSummary
    favorite {
      ...Skill
    }
    usedSummary
    used {
      ...Skill
    }
  }
  includes
}

fragment Skill on Skill {
  name
  level
  icon {
    ...DevIcon
  }
}

fragment Project on ProjectEntries {
  entries {
    rank
    name
    link
    image {
      ...ImageUrl
    }
    summary
    tags
    icon {
      ...DevIcon
    }
  }
  includes
}

fragment ReadingList on ReadingListEntries {
  entries {
    title
    progress
    author
    amazonLink
    cover {
      ...ImageUrl
    }
  }
  includes
}

fragment Blog on BlogEntries {
  entries {
    id
    title
    content
    excerpt
    media {
      ...ImageUrl
    }
    tags
    sys {
      id
      revision
      createdAt
      updatedAt
    }
  }
  includes
}

fragment ImageUrl on Asset {
  description
  file {
    url
  }
}

fragment DevIcon on DevIcon {
  name
  icon
  iconImage {
     ...ImageUrl
  }
}
`