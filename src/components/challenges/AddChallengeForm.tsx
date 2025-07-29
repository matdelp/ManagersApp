import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useFontSizeStore } from "@/store/useFontSizeStore";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { SimpleMdeReact } from "react-simplemde-editor";
import { type ChallengeData } from "../../../utils/api/create";

export const AddChallengeForm: React.FC = () => {
  const [codeSnippets, setCodeSnippets] = useState({ js: "", py: "" });
  const [language, setLanguage] = useState<"js" | "py">("js");
  const { size, changeSize } = useFontSizeStore();
  const {
    mutate: create,
    isPending,
    error: creationError,
  } = useCreateChallenge();

  const form = useForm<ChallengeData>({
    defaultValues: {
      title: "Title",
      category: "unknown",
      description: "",
      level: "Easy",
      code: {
        function_name: "function",
        code_text: [
          { language: "js", content: "" },
          { language: "py", content: "" },
        ],
        inputs: [],
      },
      test: [],
    },
  });
  const { handleSubmit, control, getValues } = form;

  const {
    fields: inputFields,
    append: appendInput,
    remove: removeInput,
  } = useFieldArray({
    control: control,
    name: "code.inputs",
  });

  const {
    fields: testFields,
    append: appendTest,
    remove: removeTest,
  } = useFieldArray({
    control: control,
    name: "test",
  });

  const handleChange = (value: string) => {
    setCodeSnippets((prev) => ({
      ...prev,
      [language === "js" ? "js" : "py"]: value,
    }));
  };

  const onSubmit = (formData: ChallengeData) => {
    const code_text: ChallengeData["code"]["code_text"] = Object.entries(
      codeSnippets
    )
      .filter(([, content]) => content.trim() !== "")
      .map(([lang, content]) => ({
        language: lang === "js" ? "js" : "py",
        content,
      }));
    const transformedData = {
      ...formData,
      code: {
        function_name: formData.code.function_name,
        code_text: code_text,
        inputs: formData.code.inputs,
      },
      test: formData.test.map((test) => ({
        weight: Number(test.weight),
        inputs: formData.code.inputs.map((input, i) => ({
          name: input.name,
          value: test.inputs[i]?.value,
        })),
        outputs: test.outputs,
      })),
    };
    create(transformedData);
  };

  if (isPending) return <div>Creation pending</div>;
  if (creationError) return <div>Creation failed</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex xl:flex-row flex-col items-start gap-5 w-full p-2"
      >
        <div className="flex flex-col gap-3 xl:w-1/2 w-full">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title*</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background-100 text-main-700 py-5"
                    placeholder="Title"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category*</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background-100 text-main-700 py-5"
                    placeholder="Category"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
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
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
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
                className="bg-main-500 text-lg p-5 cursor-pointer w-fit"
              >
                Create
              </Button>
            </div>

            <div className="flex flex-col w-full py-2">
              <FormField
                control={control}
                name="code.function_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Function name*</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background-100 text-main-700 py-5"
                        placeholder="Function name"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {inputFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-end mt-2">
                  <FormField
                    control={control}
                    name={`code.inputs.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-background-100 text-main-700 py-5"
                            required
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`code.inputs.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Type*</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="string">string</SelectItem>
                              <SelectItem value="number">number</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    className="bg-red-500"
                    onClick={() => removeInput(index)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              className="w-28 mt-2 bg-main-500 text-lg cursor-pointer"
              onClick={() => appendInput({ name: "", type: "string" })}
            >
              + Add Inputs
            </Button>
          </div>
          <div className="flex justify-end gap-2">
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
            <Select
              onValueChange={(value) => setLanguage(value as "js" | "py")}
              value={language}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="js">JavaScript</SelectItem>
                <SelectItem value="py">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CodeMirror
            className="relative"
            value={codeSnippets[language === "js" ? "js" : "py"]}
            height="200px"
            extensions={language === "js" ? [langs.jsx()] : [langs.python()]}
            onChange={handleChange}
            style={{ fontSize: size }}
          />
          <Button
            type="button"
            className="bg-main-500 text-lg p-5 cursor-pointer w-fit mt-4"
            onClick={() => appendTest({ inputs: [], outputs: "", weight: 1 })}
          >
            + Add Test
          </Button>

          {testFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 w-full">
              <div className="flex items-center">
                <Button
                  type="button"
                  aria-label="Remove test case"
                  className="bg-red-500 cursor-pointer"
                  onClick={() => removeTest(index)}
                >
                  <FaRegTrashAlt />
                </Button>
              </div>
              {getValues("code.inputs").map((input, i) => (
                <FormField
                  key={i}
                  control={control}
                  name={`test.${index}.inputs.${i}.value`}
                  render={({ field }) => (
                    <FormItem className="flex-grow basis-1/3">
                      <FormLabel>input</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-background-100 text-main-700 py-5"
                          type={input.type === "number" ? "number" : "text"}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={control}
                name={`test.${index}.outputs`}
                render={({ field }) => (
                  <FormItem className="flex-grow basis-1/3">
                    <FormLabel>Output</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background-100 text-main-700 py-5"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`test.${index}.weight`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background-100 text-main-700 py-5"
                        type="number"
                        step="0.1"
                        min={0}
                        max={1}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>{" "}
      </form>
    </Form>
  );
};
