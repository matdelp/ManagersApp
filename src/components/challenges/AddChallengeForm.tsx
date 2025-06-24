import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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

export const AddChallengeForm: React.FC = () => {
  const [code, setCode] = useState(`// Type your code here`);
  const [language, setLanguage] = useState<string>("javascript");
  const { size, changeSize } = useFontSizeStore();

  const form = useForm();
  const onCreate: SubmitHandler<FieldValues> = (values) => {
    console.log(values);
  }; // Change to my custom type of data ?
  const handleChange = (value: string) => {
    setCode(value); //temporary
  };
  const handleClick = () => {
    console.log("Code is:", code);
  }; //temporary
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
                    <SelectTrigger>
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
            render={() => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <SimpleMdeReact />
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
                    fontSize: size
                  }}
                />
                <Button
                  type="button"
                  className="bg-main-500 text-lg p-5 cursor-pointer absolute right-3 -bottom-10"
                  style={{ zIndex: 10 }}
                  onClick={handleClick}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
