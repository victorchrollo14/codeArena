export interface User {
  id: number;
  username: string;
  email: string;
  gender: string;
  address: string;
  birthDay: Date;
  password: string;
  links: {
    github: string;
    website: string;
    xCom: string;
    linkedIn: string;
  };
  experience: {
    company: string;
    title: string;
    startDate: Date;
    endDate: Date | "Present";
  }[];
  education: {
    school: string;
    degree: string;
    startDate: Date;
    endDate: Date | "Present";
  }[];
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Problems {
  id: number;
  title: string;
  description: string;
  level: "easy" | "difficult" | "medium";
  status: "todo" | "attempted" | "solved";
  tags: string[];
  editorial: string; // main solution;
  testCases: {
    args: string | number | boolean | object | Array<string | boolean | number>;
    expectedOutput:
      | string
      | boolean
      | number
      | object
      | Array<string | boolean | number>;
  }[];
  memoryLimit: string;
  timeLimit: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Submissions {
  id: number;
  problemId: number; // id of the problem;
  userId: number;
  language: string;
  content: string;
  status:
    | "accepted"
    | "internal error"
    | "Time limit exceeded"
    | "Memory limit Exceeded"
    | "runtime error"
    | "wrong answer";
  runTime: string;
  memoryUsage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Solution {
  id: number;
  userId: number;
  problemId: number;
  content: string;
  tags: string[];
  views: number;
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

// export interface TemporaryCode {
//   id: number;
//   jobId: number;
//   problemId: number;
//   language: "python" | "go" | "javascript" | "typescript";
//   code: string;
//   results: Array<{
//     output:
//       | string
//       | boolean
//       | number
//       | object
//       | Array<string | boolean | number | object>;
//     stdout: string;
//   }>;
//   error: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
//
//
// I think it's ok to use arrays for tags and other stuff.
// if there is an array of object better put it in  a seperate table;
// maybe ok to use an object inside sql, when there is an arbitrary structure;
