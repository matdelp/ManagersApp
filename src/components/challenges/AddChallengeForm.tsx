import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Input } from "@/components/ui/input";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";

export const AddChallengeForm: React.FC = () => {
  const [code, setCode] = useState(`// Type your code here`);
  const form = useForm();
  const onCreate = (values) => {
    console.log(values);
  };
  const handleChange = (value) => {
    setCode(value);
  };

  const handleClick = () => {
    console.log("Code is:", code);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onCreate)}
        className="flex items-start gap-5 w-full p-2"
      >
        <div className="flex flex-col gap-3 w-1/2">
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
            render={({ field }) => (
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
        <div className="flex flex-col gap-5 w-1/2 p-2">
          <div className="flex flex-col w-full relative">
            <Button
              type="submit"
              className="bg-main-500 text-lg p-5 cursor-pointer w-fit absolute right-0 top-0"
            >
              Create
            </Button>
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
          <div>
            <CodeMirror
              className="relative"
              value={code}
              height="200px"
              extensions={[langs.jsx(), langs.python()]}
              onChange={handleChange}
            />
            <Button
              type="button"
              className="bg-main-500 text-lg p-5 cursor-pointer absolute right-3"
              onClick={handleClick}
            >
              +
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
