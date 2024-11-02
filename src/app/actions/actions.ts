"use server";

type Section = {
  id: string;
  title: string;
  lectures: Lecture[];
};

type Lecture = {
  id: string;
  title: string;
  description: string;
  type: "video" | "slide" | "article";
};

export async function createCourse(sections: Section[]) {
  // Here you would typically save to your database

  console.log("Saving course:", sections);
  return { success: true };
}
