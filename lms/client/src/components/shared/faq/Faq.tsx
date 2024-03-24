import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Styles } from "@/styles/Custome.Styles";

export default function Faq() {
  const faqs = [
    {
      question: "What is LMS?",
      answer: "LMS stands for Learning Management System. It is a software application that helps organizations deliver, track, and manage their online learning programs.",
    },
    {
      question: "How does the LMS platform work?",
      answer: "The LMS platform allows users to access and interact with learning materials, such as courses, quizzes, and assignments, through a web-based interface. It also provides features for administrators to manage user accounts, track progress, and generate reports.",
    },
    {
      question: "What are the benefits of using an LMS?",
      answer: "Using an LMS offers several benefits, including centralized learning content, easy access to learning materials anytime and anywhere, tracking and reporting of learner progress, and the ability to deliver personalized learning experiences.",
    },
    {
      question: "What are the key features of an LMS?",
      answer: "Some key features of an LMS include course management, user management, assessment and grading, content management, reporting and analytics, and communication tools.",
    },
    {
      question: "Can an LMS support different types of learning content?",
      answer: "Yes, an LMS can support various types of learning content, such as text-based documents, videos, audio files, interactive quizzes, and multimedia presentations.",
    },
    {
      question: "Is it possible to integrate an LMS with other systems?",
      answer: "Yes, many LMS platforms offer integration capabilities with other systems, such as HR systems, CRM systems, and content authoring tools, to streamline processes and enhance the learning experience.",
    },
    {
      question: "How can an LMS benefit learners?",
      answer: "An LMS can benefit learners by providing them with a centralized platform to access learning materials, track their progress, collaborate with peers, and receive personalized learning recommendations.",
    },
    {
      question: "What is the role of an LMS administrator?",
      answer: "An LMS administrator is responsible for managing user accounts, creating and organizing courses, setting up assessments and grading criteria, generating reports, and ensuring the smooth functioning of the LMS platform.",
    },
    {
      question: "Can an LMS be used for employee training and development?",
      answer: "Yes, an LMS is commonly used for employee training and development programs, as it allows organizations to deliver and track training content, assess employee performance, and provide ongoing learning opportunities.",
    },
  ];
 


  return (
    <>
      <h1 className="text-4xl font-bold text-center leading-normal my-10">
        Frequently Asked <span className={`${Styles.textGredient}`}>Questions</span>.
      </h1>
      <div className="max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
