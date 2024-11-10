"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import Link from "next/link";
import { SignupSchema } from "../schemas";
import { useSignup } from "../api/use-sign-up";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";

export const SignUpCard = () => {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignup();
  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none ">
      <CardHeader className="flex justify-center items-center text-center p-7 ">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Enter Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size={"lg"} className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={isPending}
          size={"lg"}
          variant={"secondary"}
          className="w-full "
          onClick={() => signUpWithGoogle()}
        >
          Sign In With Google
          <FcGoogle className="mr-2 size-5" />
        </Button>
        <Button
          disabled={isPending}
          size={"lg"}
          variant={"secondary"}
          className="w-full "
          onClick={() => signUpWithGithub()}
        >
          Sign In With Github
          <FaGithub className="mr-2 size-5" />
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7 ">
        <p className="text-center">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:underline hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
