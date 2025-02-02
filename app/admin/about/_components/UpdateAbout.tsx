"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { updateAboutForm } from "@/lib/actions/about";
import type { AboutFormData } from "@/types/about";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

interface DatabaseAboutData {
  id: number;
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string | null;
  location: string | null;
  avatar: string | null;
  techStack: Array<{
    id: number;
    name: string;
    level: string;
    aboutId: number;
  }>;
  hobbies: Array<{
    id: number;
    name: string;
    details: string | null;
    aboutId: number;
  }>;
  languages: Array<{
    id: number;
    name: string;
    fluency: string;
    aboutId: number;
  }>;
  experiences: Array<{
    id: number;
    company: string;
    position: string;
    startDate: Date;
    endDate: Date | null;
    description: string | null;
    aboutId: number;
  }>;
  educations: Array<{
    id: number;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date | null;
    aboutId: number;
  }>;
  skills: Array<{
    id: number;
    name: string;
    level: string;
    aboutId: number;
  }>;
  socialLinks: Array<{
    id: number;
    name: string;
    url: string;
    aboutId: number;
  }>;
}

interface AboutUpdateFormProps {
  initialData: DatabaseAboutData;
  id: number;
}

function transformDatabaseDataToFormData(
  data: DatabaseAboutData
): AboutFormData {
  return {
    name: data.name,
    title: data.title,
    description: data.description,
    email: data.email,
    phone: data.phone || undefined,
    location: data.location || undefined,
    avatar: data.avatar || undefined,
    techStack: data.techStack.map(({ name, level }) => ({ name, level })),
    hobbies: data.hobbies.map(({ name, details }) => ({
      name,
      details: details || undefined,
    })),
    languages: data.languages.map(({ name, fluency }) => ({ name, fluency })),
    experiences: data.experiences.map(
      ({ company, position, startDate, endDate, description }) => ({
        company,
        position,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
        description: description || undefined,
      })
    ),
    educations: data.educations.map(
      ({ school, degree, fieldOfStudy, startDate, endDate }) => ({
        school,
        degree,
        fieldOfStudy,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
      })
    ),
    skills: data.skills.map(({ name, level }) => ({ name, level })),
    socialLinks: data.socialLinks.map(({ name, url }) => ({ name, url })),
  };
}

export default function AboutUpdateForm({
  initialData,
  id,
}: AboutUpdateFormProps) {
  const formData = transformDatabaseDataToFormData(initialData);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AboutFormData>({
    defaultValues: formData,
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educations",
  });

  const {
    fields: techStackFields,
    append: appendTechStack,
    remove: removeTechStack,
  } = useFieldArray({
    control,
    name: "techStack",
  });

  const {
    fields: hobbyFields,
    append: appendHobby,
    remove: removeHobby,
  } = useFieldArray({
    control,
    name: "hobbies",
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languages",
  });

  const [skills, setSkills] = useState<{ name: string; level: string }[]>(
    formData.skills || []
  );
  const [skillInput, setSkillInput] = useState({ name: "", level: "" });
  const [socialLinks, setSocialLinks] = useState<
    { name: string; url: string }[]
  >(formData.socialLinks || []);
  const [socialInput, setSocialInput] = useState({ name: "", url: "" });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    reset(formData);
    setSkills(formData.skills || []);
    setSocialLinks(formData.socialLinks || []);
  }, [formData, reset]);

  const handleRemove = (index: number, removeFunc: (index: number) => void) => {
    removeFunc(index);
  };

  const onSubmit: SubmitHandler<AboutFormData> = async (data) => {
    try {
      const formData: AboutFormData = {
        ...data,
        skills: [...skills],
        socialLinks: [...socialLinks],
      };

      console.log("Updating form data:", formData);

      const result = await updateAboutForm(formData, id);

      if (result.success) {
        setSuccessMessage("About information updated successfully!");
        if ("data" in result) {
          console.log("About Data updated successfully:", result.data);
        }
        toast.success("About information updated successfully!");
      } else {
        if ("error" in result) {
          toast.error(`Failed to update About Data: ${result.error}`);
          console.error("Failed to update About Data:", result.error);
        }
      }
    } catch (error) {
      console.error("An error occurred while updating the form:", error);
      toast.error("An error occurred while updating the form");
    }
  };

  const addSkill = () => {
    if (
      skillInput.name &&
      skillInput.level &&
      !skills.some((skill) => skill.name === skillInput.name)
    ) {
      setSkills([...skills, skillInput]);
      setSkillInput({ name: "", level: "" });
    } else {
      toast.error("Invalid skill or skill already exists");
    }
  };

  const addSocialLink = () => {
    if (socialInput.name && socialInput.url) {
      setSocialLinks([...socialLinks, socialInput]);
      setSocialInput({ name: "", url: "" });
    } else {
      toast.error("Please provide both name and URL for the social link");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-6 p-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">
          Update About Information
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Your Name"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Title (e.g., Full-Stack Developer)"
              aria-invalid={errors.title ? "true" : "false"}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Tell us about yourself"
              aria-invalid={errors.description ? "true" : "false"}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Phone Number"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="Location (e.g., Nairobi, Kenya)"
            />
          </div>

          <div>
            <Label htmlFor="avatar">Profile Image URL</Label>
            <Input
              id="avatar"
              {...register("avatar")}
              placeholder="Profile Image URL"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <Label>Tech Stack</Label>
            {techStackFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Input
                  {...register(`techStack.${index}.name` as const, {
                    required: "Tech stack item is required",
                  })}
                  placeholder="Tech stack item"
                />
                <Select
                  onValueChange={(value) => {
                    setValue(`techStack.${index}.level`, value, {
                      shouldValidate: true,
                    });
                  }}
                  defaultValue={watch(`techStack.${index}.level`)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={() => handleRemove(index, removeTechStack)}
                  variant="destructive"
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendTechStack({ name: "", level: "" })}
              className="mt-2"
            >
              Add Tech Stack Item
            </Button>
          </div>

          {/* Hobbies */}
          <div>
            <Label>Hobbies</Label>
            {hobbyFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Input
                  {...register(`hobbies.${index}.name` as const, {
                    required: "Hobby is required",
                  })}
                  placeholder="Hobby"
                />
                <Input
                  {...register(`hobbies.${index}.details` as const)}
                  placeholder="Details"
                />
                <Button
                  type="button"
                  onClick={() => handleRemove(index, removeHobby)}
                  variant="destructive"
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendHobby({ name: "", details: "" })}
              className="mt-2"
            >
              Add Hobby
            </Button>
          </div>

          {/* Languages */}
          <div>
            <Label>Languages</Label>
            {languageFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Input
                  {...register(`languages.${index}.name` as const, {
                    required: "Language is required",
                  })}
                  placeholder="Language"
                />
                <Select
                  onValueChange={(value) =>
                    setValue(`languages.${index}.fluency`, value, {
                      shouldValidate: true,
                    })
                  }
                  defaultValue={watch(`languages.${index}.fluency`)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Fluency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="conversational">
                      Conversational
                    </SelectItem>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="native">Native</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={() => handleRemove(index, removeLanguage)}
                  variant="destructive"
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendLanguage({ name: "", fluency: "" })}
              className="mt-2"
            >
              Add Language
            </Button>
          </div>

          {/* Experiences */}
          <div>
            <Label>Experiences</Label>
            {experienceFields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-2 p-4 bg-secondary rounded-lg mb-4"
              >
                <Input
                  {...register(`experiences.${index}.company` as const, {
                    required: "Company is required",
                  })}
                  placeholder="Company"
                />
                <Input
                  {...register(`experiences.${index}.position` as const, {
                    required: "Position is required",
                  })}
                  placeholder="Position"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    {...register(`experiences.${index}.startDate` as const, {
                      required: "Start date is required",
                    })}
                    type="date"
                    placeholder="Start Date"
                  />
                  <Input
                    {...register(`experiences.${index}.endDate` as const)}
                    type="date"
                    placeholder="End Date"
                  />
                </div>
                <Textarea
                  {...register(`experiences.${index}.description` as const)}
                  placeholder="Description"
                />
                <Button
                  type="button"
                  onClick={() => handleRemove(index, removeExperience)}
                  variant="destructive"
                >
                  Remove Experience
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendExperience({
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="mt-2"
            >
              Add Experience
            </Button>
          </div>

          {/* Educations */}
          <div>
            <Label>Educations</Label>
            {educationFields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-2 p-4 bg-secondary rounded-lg mb-4"
              >
                <Input
                  {...register(`educations.${index}.school` as const, {
                    required: "School is required",
                  })}
                  placeholder="School"
                />
                <Input
                  {...register(`educations.${index}.degree` as const, {
                    required: "Degree is required",
                  })}
                  placeholder="Degree"
                />
                <Input
                  {...register(`educations.${index}.fieldOfStudy` as const, {
                    required: "Field of study is required",
                  })}
                  placeholder="Field of Study"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    {...register(`educations.${index}.startDate` as const, {
                      required: "Start date is required",
                    })}
                    type="date"
                    placeholder="Start Date"
                  />
                  <Input
                    {...register(`educations.${index}.endDate` as const)}
                    type="date"
                    placeholder="End Date"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => handleRemove(index, removeEducation)}
                  variant="destructive"
                >
                  Remove Education
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendEducation({
                  school: "",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                })
              }
              className="mt-2"
            >
              Add Education
            </Button>
          </div>

          {/* Skills */}
          <div>
            <Label>Skills</Label>
            <div className="flex space-x-2">
              <Input
                value={skillInput.name}
                onChange={(e) =>
                  setSkillInput({ ...skillInput, name: e.target.value })
                }
                placeholder="Skill name"
              />
              <Select
                value={skillInput.level}
                onValueChange={(value) =>
                  setSkillInput({ ...skillInput, level: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addSkill}>
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill.name} ({skill.level})
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-1 h-4 w-4"
                      onClick={() =>
                        setSkills(skills.filter((_, i) => i !== index))
                      }
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {skill.name}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Social Links */}
          <div>
            <Label>Social Links</Label>
            <div className="flex space-x-2">
              <Input
                value={socialInput.name}
                onChange={(e) =>
                  setSocialInput({ ...socialInput, name: e.target.value })
                }
                placeholder="Platform (e.g., GitHub)"
              />
              <Input
                value={socialInput.url}
                onChange={(e) =>
                  setSocialInput({ ...socialInput, url: e.target.value })
                }
                placeholder="URL"
              />
              <Button type="button" onClick={addSocialLink}>
                Add
              </Button>
            </div>
            {socialLinks.length > 0 && (
              <ul className="mt-2 space-y-2">
                {socialLinks.map((link, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-secondary p-2 rounded"
                  >
                    <span>
                      {link.name}:{" "}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {link.url}
                      </a>
                    </span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setSocialLinks(
                          socialLinks.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Update About Info
          </Button>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
