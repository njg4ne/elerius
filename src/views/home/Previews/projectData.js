const workoutology = {
  title: "Workoutology",
  subtitle: "An interactive logbook for the gym",
  time: ["Fall 2020", null],
  tags: ["Front End", "iOS", "Software Engineering", "UX/UI", "Swift", "HCI"],
  path: "/Workoutology.pdf",
};

const bikebroadcast = {
  title: "Bike Broadcast",
  subtitle: "A cycling communication system",
  time: ["Summer 2020", "Fall 2020"],
  tags: ["Systems Engineering", "Mechatronics", "HCI", "UI/UX"],
  path: "/BikeBroadcast.pdf",
};

const pavlovsdesk = {
  title: "Pavlov's Desk",
  subtitle: "A well-being focused smart desk hutch",
  time: ["Fall 2021", "Present"],
  tags: [
    "Systems Engineering",
    "Electrical Engineering",
    "Computer Engineering",
    "Mechatronics",
    "HCI",
    "UI/UX",
  ],
  path: "/PavlovsDesk.pdf",
};

const tcm = {
  title: "Tactile Concept Mapping",
  subtitle:
    "Academic research examining vibrotactile psychophysics to support Anesthesia monitoring.",
  time: ["Summer 2021", "Present"],
  tags: [
    "Research",
    "Human Factors and Ergonomics",
    "Psychophysics",
    "Systems Engineering",
    "HCI",
    "UI/UX",
  ],
  path: "/TactileConceptMapping.pdf",
};

const elerius = {
  title: "www.elerius.ga",
  subtitle: "Nicholas Gardella's personal and professional home on the web",
  time: ["Summer 2021", "Present"],
  tags: ["Front End", "DevOps", "Docker", "React.js", "UX/UI", "HCI"],
  path: "/about",
};

const aedesaegypti = {
  title: "Animated Mosquito Stimuli",
  subtitle:
    "Python LED animation software written for customizable animation creation in biochemistry research",
  time: ["Fall 2020", "Spring 2021"],
  tags: ["Graphics", "Python", "Research", "Mechatronics", "Biochemistry"],
  path: "/AedesAegyptiStimuli.pdf",
};

export const projectData = [
  {
    name: "University of Virginia",
    projects: [tcm, pavlovsdesk],
    color: "#232D4B",
  },
  {
    name: "Virginia Tech",
    projects: [workoutology, bikebroadcast, aedesaegypti],
    color: "#630031",
  },
  { name: "Personal", projects: [elerius] },
];
