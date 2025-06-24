import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFontSizeStore } from "@/store/useFontSizeStore";

interface TestCase {
  id: number;
  type: string;
  argument: string;
  value: number;
  output: number;
  weight: number;
}

interface ChallengeFormData {
  title: string;
  category: string;
  level: "Easy" | "Moderate" | "Hard";
  bio: string;
  function: string;
  items: TestCase[];
}

export const AddChallengeForm: React.FC = () => {
  const [code, setCode] = useState(`// Type your code here`);
  const [language, setLanguage] = useState<string>("javascript");

  const { size, changeSize } = useFontSizeStore();

  const form = useForm<ChallengeFormData>({
    defaultValues: {
      title: "Title",
      category: "unknown",
      level: "Easy",
      bio: "",
      function: "Function",
      items: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });
  const onCreate: SubmitHandler<ChallengeFormData> = (values) => {
    console.log(values);
  }; // Change to my custom type of data ?
  const handleChange = (value: string) => {
    setCode(value); //temporary
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onCreate)}
        className="flex xl:flex-row flex-col items-start gap-5 w-full p-2"
      >
        <div className="flex flex-col gap-3 xl:w-1/2 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title*</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background-100 text-main-700 py-5"
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category*</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background-100 text-main-700 py-5"
                    placeholder="Category"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>level*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <SimpleMdeReact
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="xl:w-1/2 w-full flex flex-col gap-2 p-2">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-end">
              <Button
                type="submit"
                onClick={() => alert("not implemented yet")}
                className="bg-main-500 text-lg p-5 cursor-pointer w-fit"
              >
                Create
              </Button>
            </div>

            <div className="flex flex-col w-full py-2">
              <FormField
                control={form.control}
                name="function"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Function name*</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background-100 text-main-700 py-5"
                        placeholder="Function name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <div className="flex justify-end">
                <Select onValueChange={changeSize} value={size}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setLanguage} value={language}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <CodeMirror
                  className="relative"
                  value={code}
                  height="200px"
                  extensions={
                    language === "javascript" ? [langs.jsx()] : [langs.python()]
                  }
                  onChange={handleChange}
                  style={{
                    fontSize: size,
                  }}
                />
                <Button
                  type="button"
                  className="bg-main-500 text-lg p-5 cursor-pointer absolute right-3 -bottom-10"
                  onClick={() =>
                    append({
                      id: Date.now(),
                      type: "number",
                      argument: "a",
                      value: 10,
                      output: 10,
                      weight: 0.8,
                    })
                  }
                >
                  +
                </Button>
              </div>{" "}
              <h2 className="text-xl py-5">
                Tests<span>*</span>
              </h2>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 w-full">
                  <div className="flex items-center">
                    <Button
                      type="button"
                      aria-label="Remove test case"
                      className="bg-red-500 cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full">
                    <FormField
                      control={form.control}
                      name={`items.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="flex-grow basis-1/3">
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="number">number</SelectItem>
                                <SelectItem value="string">string</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.argument`} // <-- unique name
                      render={({ field }) => (
                        <FormItem className="flex-grow basis-1/3">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-background-100 text-main-700 py-5"
                              type="string"
                              placeholder="argument"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.value`} // <-- unique name
                      render={({ field }) => (
                        <FormItem className="flex-grow basis-1/3">
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-background-100 text-main-700 py-5"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.output`} // <-- unique name
                      render={({ field }) => (
                        <FormItem className="flex-grow basis-1/3">
                          <FormLabel>Output</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-background-100 text-main-700 py-5"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.weight`} // <-- unique name
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-background-100 text-main-700 py-5"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
