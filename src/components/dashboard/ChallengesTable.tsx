"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteChallenge } from "@/hooks/useDeleteChallenge";
import Link from "next/link";
import React from "react";
import { FaPen } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Challenge } from "./ChallengesTable.container";

type ChallengesTableProps = {
  items: Challenge[];
};

export const ChallengesTable: React.FC<ChallengesTableProps> = ({ items }) => {
  const { mutate: deleteChallenge, isPending, error } = useDeleteChallenge();
  if (isPending) return <div>Edit pending</div>;
  if (error) return <div>Edit failed</div>;
  const handleDelete = (id: string) => {
    deleteChallenge(id);
  };
  return (
    <>
      <Table>
        <TableCaption>Your challenge list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Difficulty</TableHead>
            <TableHead className="text-center">Created at</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        {items.map((item) => (
          <TableBody key={item._id}>
            <TableRow>
              <TableCell className="text-center">{item.title}</TableCell>
              <TableCell className="text-center">{item.category}</TableCell>
              <TableCell className="text-center">{item.level}</TableCell>
              <TableCell className="text-center">{item.createdAt}</TableCell>
              <TableCell className="flex gap-5 justify-center">
                <Link href={`/challenges/edit/${item._id}`}>
                  <Button className="bg-main-500 cursor-pointer w-10">
                    <FaPen />
                  </Button>
                </Link>
                <Button
                  className="bg-red-400 cursor-pointer w-10"
                  onClick={() => handleDelete(item._id)}
                >
                  <FaRegTrashCan />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </>
  );
};
