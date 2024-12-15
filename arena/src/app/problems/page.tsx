import { Header } from "@components/Header";
import { Question, QuestionList } from "@components/QuestionList";
import { fetchProblems } from "lib/problemController";
import React from "react";

const ProblemSetPage = async () => {
  const data = await fetchProblems();

  const problems: Question[] = data.map((item) => {
    return { ...item, hasSolution: true, status: "not-started" };
  });

  return (
    <div>
      <Header />
      <section className="flex justify-center items-center mt-5 my-10">
        <QuestionList questions={problems} />
      </section>
    </div>
  );
};

export default ProblemSetPage;
