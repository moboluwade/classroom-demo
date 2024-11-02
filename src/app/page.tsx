"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  ChevronDown,
  ChevronUp,
  File,
  FilePlus,
  FolderPlus,
  List,
  ListOrdered,
  PlayCircle,
  SlidersHorizontal,
  X,
} from "lucide-react";
// import { cn } from '@/lib/utils'
import { createCourse } from "@/app/actions/actions";
import { v4 as uuidv4 } from "uuid";

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

export default function Component() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "Introduction",
      lectures: [
        {
          id: "1",
          title: "Introduction Video",
          description: "",
          type: "video",
        },
      ],
    },
  ]);
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);
  const [expandedLectures, setExpandedLectures] = useState<string[]>([]);

  const addSection = () => {
    const newSection: Section = {
      id: uuidv4(),
      title: "New Section",
      lectures: [],
    };
    setSections([...sections, newSection]);
  };

  const addLecture = (sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: [
              ...section.lectures,
              {
                id: uuidv4(),
                title: "New Lecture",
                description: "",
                type: "video",
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const updateLectureType = (
    sectionId: string,
    lectureId: string,
    type: Lecture["type"]
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: section.lectures.map((lecture) => {
              if (lecture.id === lectureId) {
                return { ...lecture, type };
              }
              return lecture;
            }),
          };
        }
        return section;
      })
    );
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((expanded) =>
      expanded.includes(sectionId)
        ? expanded.filter((id) => id !== sectionId)
        : [...expanded, sectionId]
    );
  };

  const toggleLecture = (lectureId: string) => {
    setExpandedLectures((expanded) =>
      expanded.includes(lectureId)
        ? expanded.filter((id) => id !== lectureId)
        : [...expanded, lectureId]
    );
  };

  return (
    <div className="dark w-screen max-w-4xl mx-auto p-4 space-y-4 bg-background text-foreground">
      <span className="mx-auto text-3xl font-semibold">Classes</span>
      <form action={() => createCourse(sections)}>
        <ScrollArea className="h-fit rounded-md border border-border p-4">
          {sections.map((section, sectionIndex) => (
            <Card
              key={section.id}
              className="mb-4 bg-card text-card-foreground"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSection(section.id)}
                    type="button"
                  >
                    {expandedSections.includes(section.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <Input
                      value={`Section ${sectionIndex + 1}: ${section.title}`}
                      onChange={(e) =>
                        setSections(
                          sections.map((s) =>
                            s.id === section.id
                              ? {
                                  ...s,
                                  title: e.target.value.replace(
                                    `Section ${sectionIndex + 1}: `,
                                    ""
                                  ),
                                }
                              : s
                          )
                        )
                      }
                      className="font-semibold bg-input text-input-foreground"
                    />
                  </div>
                </div>

                <Collapsible open={expandedSections.includes(section.id)}>
                  <CollapsibleContent className="space-y-4">
                    {section.lectures.map((lecture, lectureIndex) => (
                      <div key={lecture.id} className="pl-6 space-y-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleLecture(lecture.id)}
                            type="button"
                          >
                            {expandedLectures.includes(lecture.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="flex-1">
                            <Input
                              value={`Lecture ${lectureIndex + 1}: ${
                                lecture.title
                              }`}
                              onChange={(e) =>
                                setSections(
                                  sections.map((s) =>
                                    s.id === section.id
                                      ? {
                                          ...s,
                                          lectures: s.lectures.map((l) =>
                                            l.id === lecture.id
                                              ? {
                                                  ...l,
                                                  title: e.target.value.replace(
                                                    `Lecture ${
                                                      lectureIndex + 1
                                                    }: `,
                                                    ""
                                                  ),
                                                }
                                              : l
                                          ),
                                        }
                                      : s
                                  )
                                )
                              }
                              className="bg-input text-input-foreground"
                            />
                          </div>
                        </div>

                        <Collapsible
                          open={expandedLectures.includes(lecture.id)}
                        >
                          <CollapsibleContent className="space-y-4">
                            <div className="pl-6">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                  >
                                    <Bold className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                  >
                                    <List className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                  >
                                    <ListOrdered className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Textarea
                                  placeholder="Add a description. Include what students will be able to do after completing the lecture."
                                  value={lecture.description}
                                  onChange={(e) =>
                                    setSections(
                                      sections.map((s) =>
                                        s.id === section.id
                                          ? {
                                              ...s,
                                              lectures: s.lectures.map((l) =>
                                                l.id === lecture.id
                                                  ? {
                                                      ...l,
                                                      description:
                                                        e.target.value,
                                                    }
                                                  : l
                                              ),
                                            }
                                          : s
                                      )
                                    )
                                  }
                                  className="min-h-[100px] bg-input text-input-foreground"
                                />
                              </div>

                              <Separator className="my-4" />

                              <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                  Select content type
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                  <Button
                                    variant={
                                      lecture.type === "video"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="h-24 flex flex-col items-center justify-center gap-2"
                                    onClick={() =>
                                      updateLectureType(
                                        section.id,
                                        lecture.id,
                                        "video"
                                      )
                                    }
                                    type="button"
                                  >
                                    <PlayCircle className="h-8 w-8" />
                                    <span>Video</span>
                                  </Button>
                                  <Button
                                    variant={
                                      lecture.type === "slide"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="h-24 flex flex-col items-center justify-center gap-2"
                                    onClick={() =>
                                      updateLectureType(
                                        section.id,
                                        lecture.id,
                                        "slide"
                                      )
                                    }
                                    type="button"
                                  >
                                    <SlidersHorizontal className="h-8 w-8" />
                                    <span>Video & Slide Mashup</span>
                                  </Button>
                                  <Button
                                    variant={
                                      lecture.type === "article"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="h-24 flex flex-col items-center justify-center gap-2"
                                    onClick={() =>
                                      updateLectureType(
                                        section.id,
                                        lecture.id,
                                        "article"
                                      )
                                    }
                                    type="button"
                                  >
                                    <File className="h-8 w-8" />
                                    <span>Article</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-6"
                      onClick={() => addLecture(section.id)}
                      type="button"
                    >
                      <FilePlus className="h-4 w-4 mr-2" />
                      Add lecture
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outline"
            onClick={addSection}
            className="w-full"
            type="button"
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            Add section
          </Button>
        </ScrollArea>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Save Course</Button>
        </div>
      </form>
    </div>
  );
}
